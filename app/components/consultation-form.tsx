"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useCsrf } from "../hooks/useCsrf";
import { usePrivacyPolicy } from "./privacy-policy-provider";

// Zod schema for consultation form validation
const consultationFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "ФИО обязательно")
    .max(150, "ФИО слишком длинное"),
  email: z
    .string()
    .email("Некорректный email")
    .max(100, "Email слишком длинный"),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .max(30, "Телефон слишком длинный"),
  question: z
    .string()
    .min(1, "Вопрос обязателен")
    .max(2000, "Вопрос слишком длинный"),
  // Security fields
  csrfToken: z.string().min(1, "Security token required"),
  honeypot: z.string().length(0, "Bot detected"), // Should always be empty
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Privacy Policy modal
  const { openPrivacyPolicy } = usePrivacyPolicy();

  // CSRF token management
  const {
    csrfToken,
    loading: csrfLoading,
    error: csrfError,
    refreshToken,
  } = useCsrf();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      question: "",
      csrfToken: "",
      honeypot: "", // This should remain empty (bot trap)
    },
  });

  // Update CSRF token when it's available
  useEffect(() => {
    if (csrfToken) {
      setValue("csrfToken", csrfToken);
    }
  }, [csrfToken, setValue]);

  const onSubmit = async (data: ConsultationFormData) => {
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
        text: "Произошла ошибка при отправке формы",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/submit-consultation", {
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
          text: responseData.message || "Заявка успешно отправлена!",
        });
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
        text: "Произошла ошибка при отправке заявки. Попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while CSRF token is being fetched
  if (csrfLoading) {
    return (
      <div className="py-8">
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
      <div className="py-8">
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-md font-medium text-neutral-700 mb-2"
        >
          ФИО *
        </label>
        <input
          {...register("fullName")}
          type="text"
          id="fullName"
          className="input input-md block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white border border-neutral-300 focus:border-primary focus:outline-none"
          placeholder="Иванов Иван Иванович"
          autoComplete="name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-neutral-700 mb-2"
        >
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="input input-md block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white border border-neutral-300 focus:border-primary focus:outline-none"
          placeholder="email@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-md font-medium text-neutral-700 mb-2"
        >
          Телефон *
        </label>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          className="input input-md block w-full placeholder:text-gray-300 text-neutral-900 rounded-sm bg-white border border-neutral-300 focus:border-primary focus:outline-none"
          placeholder="+7 (999) 123-45-67"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Question */}
      <div>
        <label
          htmlFor="question"
          className="block text-md font-medium text-neutral-700 mb-2"
        >
          Вопрос *
        </label>
        <textarea
          {...register("question")}
          id="question"
          rows={3}
          className="textarea textarea-md textarea-bordered w-full placeholder:text-gray-300 text-neutral-900 bg-white rounded-sm border border-neutral-300 focus:border-primary focus:outline-none"
          placeholder="Опишите ваш вопрос или задачу..."
        />
        {errors.question && (
          <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
        )}
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`alert ${
            submitMessage.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={isSubmitting || !csrfToken}
          className="btn btn-primary btn-lg w-full"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Отправка...
            </>
          ) : !csrfToken ? (
            "Загрузка..."
          ) : (
            "Получить консультацию"
          )}
        </button>
        <p className="text-sm text-neutral-600 text-center">
          Отправляя форму, вы соглашаетесь с{" "}
          <button
            type="button"
            onClick={openPrivacyPolicy}
            className="link link-primary hover:no-underline focus:no-underline"
          >
            политикой конфиденциальности
          </button>
        </p>
      </div>
    </form>
  );
}
