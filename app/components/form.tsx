"use client";

import { Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Zod schema for form validation
const productSpecSchema = z.object({
  brand: z.string().min(1, "Название бренда обязательно"),
  collection: z.string().min(1, "Название коллекции обязательно"),
  productName: z.string().min(1, "Рабочее название продукта обязательно"),
  marketingClaims: z.string().optional(),
  marketingClaimsProperties: z.string().optional(),
  analogues: z.string().optional(),
  primaryPackaging: z.string().optional(),
  packagingAnalogues: z.string().optional(),
  packagingVolume: z.string().optional(),
  designIdeas: z.string().optional(),
  textureDescription: z.string().optional(),
  components: z.string().optional(),
  fragrance: z.string().optional(),
  textureBench: z.string().optional(),
  tonesCount: z.string().optional(),
  purchaseVolumes: z.string().optional(),
  targetCost: z.string().optional(),
  plannedDeliveryDate: z.string().optional(),
});

const formSchema = z.object({
  // Basic customer information
  name: z.string().min(1, "Имя обязательно"),
  company: z.string().optional(),
  email: z.email("Некорректный email"),
  phone: z.string().optional(),

  // Product specifications (array for multiple products)
  products: z.array(productSpecSchema).min(1, "Добавьте хотя бы один продукт"),
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

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="space-y-6">
      <h4
        className="text-2xl font-semibold text-neutral-700 border-b border-neutral-200 cursor-pointer hover:text-neutral-900 transition-colors flex items-center justify-between py-1"
        onClick={toggleCollapsed}
      >
        {title}
        <span className="text-lg">{isCollapsed ? "+" : "−"}</span>
      </h4>
      {!isCollapsed && <div className="space-y-6">{children}</div>}
    </div>
  );
}

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      products: [
        {
          brand: "",
          collection: "",
          productName: "",
        },
      ], // Start with one product
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/submit-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitMessage({ type: "success", text: "Бриф успешно отправлен!" });
        reset();
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Произошла ошибка при отправке брифа",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-[clamp(2rem,3rem)]">
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
                Продукт {index + 1}
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
            <CollapsibleSection title="Маркетинг">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Маркетинговые клеймы (без подтверждения доп. испытаниями)
                </label>
                <textarea
                  {...register(`products.${index}.marketingClaims`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Например, компоненты в текстуре содержат витамины и масла"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Маркетинговые клеймы и потребительские свойства
                </label>
                <textarea
                  {...register(`products.${index}.marketingClaimsProperties`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Например, чистый состав без синтетического воска и тяжелых металлов"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Аналоги, к которым стремимся
                </label>
                <textarea
                  {...register(`products.${index}.analogues`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Ссылки на продукты и описание"
                />
              </div>
            </CollapsibleSection>
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
            <CollapsibleSection title="Дизайн">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Идеи дизайнов для просчета
                </label>
                <textarea
                  {...register(`products.${index}.designIdeas`)}
                  rows={3}
                  className="textarea textarea-lg textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm"
                  placeholder="Тип печати, количество цветов и т.д. Например, круговой стикер, 2-3 цвета"
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-6">
            <CollapsibleSection title="Текстура">
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
                  placeholder="Например, витамины, минеральные масла и т.д."
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
                  Бенч для копирования по текстуре
                </label>
                <input
                  {...register(`products.${index}.textureBench`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-6">
            <CollapsibleSection title="Тона">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Количество тонов
                </label>
                <input
                  {...register(`products.${index}.tonesCount`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                />
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-[clamp(2rem,3rem)] mb-12">
            <CollapsibleSection title="Производство">
              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Ориентировочные объемы закупки
                </label>
                <input
                  {...register(`products.${index}.purchaseVolumes`)}
                  type="text"
                  className="input input-lg block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white"
                  placeholder="На месяц / квартал / год"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-neutral-500 mb-2">
                  Целевая себестоимость продукта с НДС
                </label>
                <input
                  {...register(`products.${index}.targetCost`)}
                  type="text"
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

          <div className="w-full flex justify-end gap-3">
            <button
              type="button"
              onClick={addProduct}
              className="btn btn-outline btn-lg"
            >
              Добавить еще продукт
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Отправка...
                </>
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
