"use client";

import { Fragment } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import { useCsrf } from "../hooks/useCsrf";
import reachGoal from "../helpers/metrika";

// Zod schema for form validation (client-side with length limits)
const productSpecSchema = z.object({
  brand: z
    .string()
    .min(1, "Название бренда обязательно")
    .max(100, "Название бренда слишком длинное"),
  collection: z
    .string()
    .min(1, "Название коллекции обязательно")
    .max(100, "Название коллекции слишком длинное"),
  productName: z
    .string()
    .min(1, "Рабочее название продукта обязательно")
    .max(150, "Название продукта слишком длинное"),
  primaryPackaging: z
    .string()
    .max(1000, "Описание упаковки слишком длинное")
    .optional(),
  packagingAnalogues: z
    .string()
    .max(1000, "Аналоги упаковки слишком длинные")
    .optional(),
  packagingVolume: z
    .string()
    .max(50, "Объем упаковки слишком длинный")
    .optional(),
  textureDescription: z
    .string()
    .max(1000, "Описание текстуры слишком длинное")
    .optional(),
  components: z.string().max(1000, "Компоненты слишком длинные").optional(),
  fragrance: z.string().max(500, "Отдушка слишком длинная").optional(),
  textureBench: z.string().max(200, "Бенч слишком длинный").optional(),
  targetCost: z
    .string()
    .max(100, "Целевая стоимость слишком длинная")
    .optional(),
  plannedDeliveryDate: z
    .string()
    .max(100, "Дата доставки слишком длинная")
    .optional(),
});

const formSchema = z.object({
  // Basic customer information
  name: z.string().min(1, "Имя обязательно").max(100, "Имя слишком длинное"),
  company: z.string().max(200, "Название компании слишком длинное").optional(),
  email: z.email("Некорректный email").max(100, "Email слишком длинный"),
  phone: z.string().max(30, "Телефон слишком длинный").optional(),

  // Security fields
  csrfToken: z.string().min(1, "Security token required"),
  honeypot: z.string().length(0, "Bot detected"), // Should always be empty

  // Product specifications (array for multiple products)
  products: z
    .array(productSpecSchema)
    .min(1, "Добавьте хотя бы один продукт")
    .max(10, "Максимум 10 продуктов"),
});

type FormData = z.infer<typeof formSchema>;

// Collapsible Section Component
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

function CollapsibleSection({
  title,
  children,
  defaultCollapsed = true,
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Focus first form control when section opens
  useEffect(() => {
    if (!isCollapsed && sectionRef.current) {
      // Use setTimeout to ensure the DOM has updated after state change
      setTimeout(() => {
        const firstFormControl = sectionRef.current?.querySelector(
          'input[type="text"], textarea'
        ) as HTMLInputElement | HTMLTextAreaElement;

        if (firstFormControl) {
          firstFormControl.focus();
        }
      }, 0);
    }
  }, [isCollapsed]);

  return (
    <div className="space-y-6">
      <h4
        className="text-2xl font-semibold text-neutral-700 border-b border-neutral-200 cursor-pointer hover:text-neutral-900 transition-colors flex items-center justify-between py-1"
        onClick={toggleCollapsed}
      >
        {title}
        <span className="text-lg">{isCollapsed ? "+" : "−"}</span>
      </h4>
      {!isCollapsed && (
        <div ref={sectionRef} className="space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // CSRF token management
  const {
    csrfToken,
    loading: csrfLoading,
    error: csrfError,
    refreshToken,
  } = useCsrf();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      csrfToken: "",
      honeypot: "", // This should remain empty (bot trap)
      products: [
        {
          brand: "",
          collection: "",
          productName: "",
        },
      ], // Start with one product
    },
  });

  // Update CSRF token when it's available
  useEffect(() => {
    if (csrfToken) {
      setValue("csrfToken", csrfToken);
    }
  }, [csrfToken, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  // Watch all product names to update titles dynamically
  const watchedProducts = useWatch({
    control,
    name: "products",
  });

  // Function to get dynamic title for a product
  const getProductTitle = (index: number) => {
    const productName = watchedProducts?.[index]?.productName?.trim();
    return productName || `Продукт ${index + 1}`;
  };

  const onSubmit = async (data: FormData) => {
    // Security pre-checks
    if (!csrfToken) {
      setSubmitMessage({
        type: "error",
        text: "Ошибка безопасности. Перезагрузите страницу и попробуйте снова.",
      });
      return;
    }

    // Bot detection - if honeypot is filled, it's a bot
    if (data.honeypot) {
      console.warn("Bot detected - honeypot field filled");
      setSubmitMessage({
        type: "error",
        text: "Произошла ошибка при отправке брифа",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/submit-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: responseData.message || "Бриф успешно отправлен!",
        });
        reachGoal("submit_brief_form");
        reset();
        // Refresh CSRF token for next submission
        refreshToken();
      } else {
        // Handle specific error cases
        if (response.status === 429) {
          setSubmitMessage({
            type: "error",
            text: "Слишком много запросов. Попробуйте через 15 минут.",
          });
        } else if (response.status === 403) {
          setSubmitMessage({
            type: "error",
            text: "Ошибка безопасности. Перезагрузите страницу и попробуйте снова.",
          });
          refreshToken(); // Get new CSRF token
        } else if (response.status === 400) {
          setSubmitMessage({
            type: "error",
            text:
              responseData.error || "Проверьте правильность заполнения формы",
          });
        } else {
          throw new Error(responseData.error || "Ошибка отправки");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage({
        type: "error",
        text: "Произошла ошибка при отправке брифа. Попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProduct = () => {
    append({
      brand: "",
      collection: "",
      productName: "",
    });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Show loading state while CSRF token is being fetched
  if (csrfLoading) {
    return (
      <div className="py-[clamp(2rem,3rem)] px-[clamp(2rem,3rem)]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-neutral-600 mt-4">Инициализация формы...</p>
        </div>
      </div>
    );
  }

  // Show error state if CSRF token failed to load
  if (csrfError) {
    return (
      <div className="py-[clamp(2rem,3rem)] px-[clamp(2rem,3rem)]">
        <div className="alert alert-error">
          <p>Ошибка загрузки формы: {csrfError}</p>
          <button onClick={refreshToken} className="btn btn-outline btn-sm">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-[clamp(2rem,3rem)]">
      {/* Honeypot field - hidden from users but visible to bots */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <input
          {...register("honeypot")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          placeholder="Leave this field empty"
        />
      </div>

      {/* Hidden CSRF token field */}
      <input {...register("csrfToken")} type="hidden" value={csrfToken || ""} />

      <div className="px-[clamp(2rem,3rem)] mb-8">
        <h2 className="text-[clamp(var(--text-2xl),var(--text-4xl))] leading-[clamp(2rem,3rem)] font-semibold mb-[clamp(1rem,2rem)] text-neutral-900">
          Заполните бриф
        </h2>
        <p className="text-[clamp(var(--text-lg),var(--text-xl))] font-thin max-w-4xl text-neutral-700">
          Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения
          деталей и подготовки персонального предложения.
        </p>
      </div>

      {/* Basic Customer Information Section */}
      <div className="px-[clamp(2rem,3rem)] my-8 mb-12">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
          Основная информация о клиенте
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xl font-medium text-neutral-500 mb-2"
            >
              Имя *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="input input-xl block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-transparent"
              placeholder="Ваше имя"
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-red-500 text-base mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-xl font-medium text-neutral-500 mb-2"
            >
              Компания
            </label>
            <input
              {...register("company")}
              type="text"
              id="company"
              className="input input-xl block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-transparent"
              placeholder="Название компании"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-medium text-neutral-500 mb-2"
            >
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="input input-xl block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-transparent"
              placeholder="email@example.com"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-base mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xl font-medium text-neutral-500 mb-2"
            >
              Телефон
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="input input-xl block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-transparent"
              placeholder="+7 (999) 123-45-67"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      {fields.map((field: any, index: number) => (
        <Fragment key={field.id}>
          <div className="px-[clamp(2rem,3rem)] mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-medium text-neutral-800">
                {getProductTitle(index)}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="btn btn-outline btn-error"
                >
                  Удалить
                </button>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Рабочее название продукта
                </label>
                <input
                  {...register(`products.${index}.productName`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                  placeholder="Например, увлажняющий баттер для тела"
                />
                {errors.products?.[index]?.productName && (
                  <p className="text-red-500 text-base mt-1">
                    {errors.products[index]?.productName?.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium text-neutral-500 mb-2">
                    Бренд
                  </label>
                  <input
                    {...register(`products.${index}.brand`)}
                    type="text"
                    className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                    placeholder="Название бренда"
                  />
                  {errors.products?.[index]?.brand && (
                    <p className="text-red-500 text-base mt-1">
                      {errors.products[index]?.brand?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium text-neutral-500 mb-2">
                    Коллекция / Базовый ассортимент
                  </label>
                  <input
                    {...register(`products.${index}.collection`)}
                    type="text"
                    className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                    placeholder="Как будет называться коллекция"
                  />
                  {errors.products?.[index]?.collection && (
                    <p className="text-red-500 text-base mt-1">
                      {errors.products[index]?.collection?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-6">
            <CollapsibleSection title="Упаковка">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Описание первичной упаковки
                </label>
                <textarea
                  {...register(`products.${index}.primaryPackaging`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Например, банка с отсекателем, стикер 2-3 цвета"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Аналоги упаковки
                </label>
                <textarea
                  {...register(`products.${index}.packagingAnalogues`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Ссылки на товары с аналогичной упаковкой"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Объем упаковки
                </label>
                <input
                  {...register(`products.${index}.packagingVolume`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                  placeholder="180 мл"
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-6">
            <CollapsibleSection title="Органолептические свойства">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Описание текстуры
                </label>
                <textarea
                  {...register(`products.${index}.textureDescription`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Например, увлажняет, насыщенная и т.д."
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Компоненты
                </label>
                <textarea
                  {...register(`products.${index}.components`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Что должно быть и чего не должно быть в продукте. Например, витамины, минеральные масла и т.д."
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Отдушка
                </label>
                <textarea
                  {...register(`products.${index}.fragrance`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Например, не яркая"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Примеры конкурентов
                </label>
                <textarea
                  {...register(`products.${index}.textureBench`)}
                  rows={3}
                  placeholder="Ссылки на продукты и описание конкурентов"
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-12">
            <CollapsibleSection title="Производство">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Себестоимость
                </label>
                <input
                  {...register(`products.${index}.targetCost`)}
                  type="text"
                  placeholder="Стоимость за 1 единицу товара (мл) или 1 кг готового продукта"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Планируемая дата первых отгрузок продукта
                </label>
                <input
                  {...register(`products.${index}.plannedDeliveryDate`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                />
              </div>
            </CollapsibleSection>
          </div>
        </Fragment>
      ))}

      {/* Errors */}
      {errors.products && (
        <div className="px-[clamp(2rem,3rem)]">
          <p className="text-red-500 text-base">{errors.products.message}</p>
        </div>
      )}

      {/* Submit section */}
      <div className="px-[clamp(2rem,3rem)]">
        <div className="flex flex-col space-y-4">
          {submitMessage && (
            <div
              className={`alert ${
                submitMessage.type === "success"
                  ? "alert-success"
                  : "alert-error"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <div className="w-full flex flex-col md:flex-row md:justify-end gap-3">
            <button
              type="button"
              onClick={addProduct}
              className="btn btn-outline btn-lg"
            >
              Добавить еще продукт
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !csrfToken}
              className="btn btn-primary btn-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Отправка...
                </>
              ) : !csrfToken ? (
                "Загрузка..."
              ) : (
                "Отправить бриф"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
