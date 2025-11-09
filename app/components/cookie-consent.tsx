"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, CogIcon } from "@heroicons/react/24/outline";
import { usePrivacyPolicy } from "./privacy-policy-provider";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  functional: false,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);
  const { openPrivacyPolicy } = usePrivacyPolicy();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    savePreferences(defaultPreferences);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowPreferences(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());

    setPreferences(prefs);
    setShowBanner(false);

    // Here you would typically initialize analytics/marketing scripts based on preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      console.log("Analytics cookies accepted");
    }
    if (prefs.marketing) {
      // Initialize marketing cookies (e.g., Facebook Pixel, Google Ads)
      console.log("Marketing cookies accepted");
    }
    if (prefs.functional) {
      // Initialize functional cookies (e.g., chat widgets, preferences)
      console.log("Functional cookies accepted");
    }
  };

  const handlePreferenceChange = (
    type: keyof CookiePreferences,
    value: boolean
  ) => {
    if (type === "necessary") return; // Necessary cookies cannot be disabled
    setPreferences((prev) => ({ ...prev, [type]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300 shadow-2xl">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                Использование файлов cookie
              </h3>
              <p className="text-sm text-base-content/80 leading-relaxed">
                Мы используем файлы cookie для улучшения работы сайта, анализа
                трафика и персонализации контента. Продолжая использовать наш
                сайт, вы соглашаетесь с нашей{" "}
                <button
                  onClick={openPrivacyPolicy}
                  className="link link-primary"
                >
                  политикой конфиденциальности
                </button>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="btn btn-outline btn-sm gap-2"
              >
                <CogIcon className="w-4 h-4" />
                Настройки
              </button>
              <button
                onClick={handleRejectAll}
                className="btn btn-ghost btn-sm"
              >
                Отклонить все
              </button>
              <button
                onClick={handleAcceptAll}
                className="btn btn-primary btn-sm"
              >
                Принять все
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Настройки cookie</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                  aria-label="Закрыть настройки cookie"
                  title="Закрыть"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p>
                    Мы используем различные типы файлов cookie для обеспечения
                    наилучшего опыта использования нашего сайта. Вы можете
                    выбрать, какие категории cookie разрешить.
                  </p>
                </div>

                {/* Necessary Cookies */}
                <div className="border border-base-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Необходимые cookie</h3>
                      <p className="text-sm text-base-content/70">
                        Требуются для базовой функциональности сайта
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="toggle toggle-primary"
                      aria-label="Необходимые cookie (всегда включены)"
                      title="Необходимые cookie не могут быть отключены"
                    />
                  </div>
                  <p className="text-xs text-base-content/60">
                    Эти файлы cookie необходимы для работы сайта и не могут быть
                    отключены. Они обычно устанавливаются в ответ на ваши
                    действия.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-base-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Аналитические cookie</h3>
                      <p className="text-sm text-base-content/70">
                        Помогают понять, как посетители взаимодействуют с сайтом
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        handlePreferenceChange("analytics", e.target.checked)
                      }
                      className="toggle toggle-primary"
                      aria-label="Аналитические cookie"
                      title="Включить/выключить аналитические cookie"
                    />
                  </div>
                  <p className="text-xs text-base-content/60">
                    Эти файлы cookie позволяют нам подсчитывать посещения и
                    источники трафика, чтобы измерять и улучшать
                    производительность нашего сайта.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-base-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Маркетинговые cookie</h3>
                      <p className="text-sm text-base-content/70">
                        Используются для показа релевантной рекламы
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        handlePreferenceChange("marketing", e.target.checked)
                      }
                      className="toggle toggle-primary"
                      aria-label="Маркетинговые cookie"
                      title="Включить/выключить маркетинговые cookie"
                    />
                  </div>
                  <p className="text-xs text-base-content/60">
                    Эти файлы cookie могут быть установлены через наш сайт
                    нашими рекламными партнерами для создания профиля ваших
                    интересов.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border border-base-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">Функциональные cookie</h3>
                      <p className="text-sm text-base-content/70">
                        Обеспечивают расширенную функциональность и
                        персонализацию
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        handlePreferenceChange("functional", e.target.checked)
                      }
                      className="toggle toggle-primary"
                      aria-label="Функциональные cookie"
                      title="Включить/выключить функциональные cookie"
                    />
                  </div>
                  <p className="text-xs text-base-content/60">
                    Эти файлы cookie обеспечивают расширенную функциональность и
                    персонализацию, такую как видео и чат в реальном времени.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRejectAll}
                  className="btn btn-ghost flex-1"
                >
                  Отклонить все
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="btn btn-primary flex-1"
                >
                  Сохранить настройки
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-primary flex-1"
                >
                  Принять все
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
