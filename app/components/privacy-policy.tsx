'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Политика конфиденциальности</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Закрыть политику конфиденциальности"
              title="Закрыть"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Общие положения</h3>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
                пользователей сайта cosmetics.info (далее — «Сайт») компанией ООО "Демидов Люкс СПА" 
                (далее — «Компания»).
              </p>
              <p>
                Используя наш Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности 
                и даете согласие на обработку ваших персональных данных в соответствии с целями и 
                способами, описанными ниже.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Какие данные мы собираем</h3>
              <p>Мы можем собирать следующие категории персональных данных:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Контактная информация:</strong> имя, email, номер телефона, название компании</li>
                <li><strong>Информация о продукте:</strong> данные из формы брифа на разработку косметики</li>
                <li><strong>Техническая информация:</strong> IP-адрес, тип браузера, время посещения</li>
                <li><strong>Файлы cookie:</strong> данные о предпочтениях и поведении на сайте</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Цели обработки данных</h3>
              <p>Мы обрабатываем ваши персональные данные для следующих целей:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Обработка заявок на разработку косметических продуктов</li>
                <li>Связь с клиентами и предоставление консультаций</li>
                <li>Улучшение качества наших услуг и сайта</li>
                <li>Соблюдение правовых обязательств</li>
                <li>Защита от мошенничества и злоупотреблений</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Правовые основания обработки</h3>
              <p>Обработка персональных данных осуществляется на основании:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Согласия субъекта персональных данных</li>
                <li>Исполнения договора или предварительных договорных отношений</li>
                <li>Законных интересов Компании</li>
                <li>Соблюдения правовых обязательств</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Использование файлов cookie</h3>
              <p>Наш сайт использует следующие типы файлов cookie:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Необходимые:</strong> обеспечивают базовую функциональность сайта</li>
                <li><strong>Аналитические:</strong> помогают понять поведение пользователей (с вашего согласия)</li>
                <li><strong>Маркетинговые:</strong> используются для персонализированной рекламы (с вашего согласия)</li>
                <li><strong>Функциональные:</strong> улучшают пользовательский опыт (с вашего согласия)</li>
              </ul>
              <p>
                Вы можете управлять настройками cookie через баннер согласия на нашем сайте.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Передача данных третьим лицам</h3>
              <p>
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением 
                случаев, когда это необходимо для:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Исполнения договорных обязательств</li>
                <li>Соблюдения требований законодательства</li>
                <li>Защиты прав и безопасности Компании и пользователей</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Хранение данных</h3>
              <p>
                Персональные данные хранятся в течение периода, необходимого для достижения целей 
                их обработки, но не более чем это требуется в соответствии с применимым законодательством.
              </p>
              <p>
                Согласие на использование cookie действует в течение 12 месяцев с момента его предоставления.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Ваши права</h3>
              <p>В соответствии с применимым законодательством вы имеете право:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Получать информацию об обработке ваших персональных данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших данных</li>
                <li>Отзывать согласие на обработку данных</li>
                <li>Ограничивать обработку данных</li>
                <li>Получать ваши данные в структурированном формате</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Безопасность данных</h3>
              <p>
                Мы применяем технические и организационные меры для защиты ваших персональных данных 
                от несанкционированного доступа, изменения, раскрытия или уничтожения, включая:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Шифрование данных при передаче</li>
                <li>Контроль доступа к персональным данным</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Обучение сотрудников вопросам защиты данных</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Контактная информация</h3>
              <p>
                По вопросам обработки персональных данных и реализации ваших прав вы можете обращаться:
              </p>
              <ul className="list-none space-y-1">
                <li><strong>Email:</strong> info@deluxspa.ru</li>
                <li><strong>Телефон:</strong> +7 (495) 123-45-67</li>
                <li><strong>Адрес:</strong> г. Москва, Россия</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">11. Изменения в Политике</h3>
              <p>
                Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                Актуальная версия всегда доступна на нашем сайте. Существенные изменения будут 
                дополнительно доведены до вашего сведения.
              </p>
            </section>

            <section>
              <p className="text-sm text-base-content/70 mt-6">
                <strong>Дата последнего обновления:</strong> {new Date().toLocaleDateString('ru-RU')}
              </p>
            </section>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="btn btn-primary"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
