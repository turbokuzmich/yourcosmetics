"use client";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Customer Information Section */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">
          Основная информация о клиенте
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Имя *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
              placeholder="Ваше имя"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Компания
            </label>
            <input
              {...register("company")}
              type="text"
              id="company"
              className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
              placeholder="Название компании"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Телефон
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
        </div>
      </div>

      {/* Product Specifications Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-800">
            Техническая спецификация продуктов
          </h2>
          <button
            type="button"
            onClick={addProduct}
            className="btn btn-outline btn-sm"
          >
            Добавить еще продукт
          </button>
        </div>

        {fields.map((field: any, index: number) => (
          <div
            key={field.id}
            className="bg-white p-6 rounded-lg border border-neutral-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-neutral-800">
                Продукт {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="btn btn-outline btn-error btn-sm"
                >
                  Удалить
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Тип разработки */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2">
                Тип разработки
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Бренд
                  </label>
                  <input
                    {...register(`products.${index}.brand`)}
                    type="text"
                    className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                    placeholder="Название бренда"
                  />
                  {errors.products?.[index]?.brand && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.products[index]?.brand?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Коллекция / Базовый ассортимент
                  </label>
                  <input
                    {...register(`products.${index}.collection`)}
                    type="text"
                    className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                    placeholder="Как будет называться коллекция"
                  />
                  {errors.products?.[index]?.collection && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.products[index]?.collection?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Рабочее название продукта
                </label>
                <input
                  {...register(`products.${index}.productName`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, увлажняющий баттер для тела"
                />
                {errors.products?.[index]?.productName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.products[index]?.productName?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Маркетинговые клеймы (без подтверждения доп. испытаниями)
                </label>
                <textarea
                  {...register(`products.${index}.marketingClaims`)}
                  rows={5}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, компоненты в текстуре содержат витамины и масла"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Маркетинговые клеймы и потребительские свойства
                </label>
                <textarea
                  {...register(`products.${index}.marketingClaimsProperties`)}
                  rows={5}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, чистый состав без синтетического воска и тяжелых металлов"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Аналоги, к которым стремимся
                </label>
                <textarea
                  {...register(`products.${index}.analogues`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Ссылки на продукты и описание"
                />
              </div>

              {/* Упаковка */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2 mt-8">
                Упаковка
              </h4>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Описание первичной упаковки
                </label>
                <textarea
                  {...register(`products.${index}.primaryPackaging`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, банка с отсекателем, стикер 2-3 цвета"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Аналоги упаковки
                </label>
                <textarea
                  {...register(`products.${index}.packagingAnalogues`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Ссылки на товары с аналогичной упаковкой"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Объем упаковки
                </label>
                <input
                  {...register(`products.${index}.packagingVolume`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="180 мл"
                />
              </div>

              {/* Дизайн */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2 mt-8">
                Дизайн
              </h4>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Идеи дизайнов для просчета
                </label>
                <textarea
                  {...register(`products.${index}.designIdeas`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Тип печати, количество цветов и т.д. Например, круговой стикер, 2-3 цвета"
                />
              </div>

              {/* Текстура */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2 mt-8">
                Текстура
              </h4>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Описание текстуры
                </label>
                <textarea
                  {...register(`products.${index}.textureDescription`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, увлажняет, насыщенная и т.д."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Компоненты
                </label>
                <textarea
                  {...register(`products.${index}.components`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, витамины, минеральные масла и т.д."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Отдушка
                </label>
                <textarea
                  {...register(`products.${index}.fragrance`)}
                  rows={3}
                  className="textarea textarea-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="Например, не яркая"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Бенч для копирования по текстуре
                </label>
                <input
                  {...register(`products.${index}.textureBench`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                />
              </div>

              {/* Тона */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2 mt-8">
                Тона
              </h4>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Количество тонов
                </label>
                <input
                  {...register(`products.${index}.tonesCount`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                />
              </div>

              {/* Производство */}
              <h4 className="text-md font-semibold text-neutral-700 border-b border-neutral-200 pb-2 mt-8">
                Производство
              </h4>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Ориентировочные объемы закупки
                </label>
                <input
                  {...register(`products.${index}.purchaseVolumes`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                  placeholder="На месяц / квартал / год"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Целевая себестоимость продукта с НДС
                </label>
                <input
                  {...register(`products.${index}.targetCost`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Планируемая дата первых отгрузок продукта
                </label>
                <input
                  {...register(`products.${index}.plannedDeliveryDate`)}
                  type="text"
                  className="input input-bordered w-full bg-white border-neutral-300 focus:border-primary rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}

        {errors.products && (
          <p className="text-red-500 text-sm">{errors.products.message}</p>
        )}

        {/* Duplicate add product button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addProduct}
            className="btn btn-outline btn-sm"
          >
            Добавить еще продукт
          </button>
        </div>
      </div>

      {/* Submit section */}
      <div className="flex flex-col items-start space-y-4">
        {submitMessage && (
          <div
            className={`alert ${
              submitMessage.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full sm:w-auto"
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
    </form>
  );
}
