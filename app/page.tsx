import PlayerComponent from "./components/player";
import { CheckBadgeIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Form from "./components/brief-form";
import Header from "./components/header";
import WorkflowCards from "./components/workflow-cards";
import Metrika from "./components/metrika";
import BriefButton from "./components/brief-button";
import FloatingBriefButton from "./components/floating-button";
import {
  EmailButton,
  PhoneButton,
  TelegramButton,
  WhatsAppButton,
} from "./components/footer-buttons";
import { Faq } from "./components/faq";
import ConsultationForm from "./components/consultation-form";
import ConsultationButton from "./components/consultation-button";
import AdvantagesButton from "./components/advantages-button";

export default function Home() {
  return (
    <>
      <Metrika />

      {/* Шапка */}
      <Header />

      {/* Hero Section */}
      <section
        className="hero-radial-gradient relative pt-[clamp(3rem,5rem)] pb-[clamp(3rem,5rem)]"
        id="hero-block"
      >
        <div className="max-w-7xl mx-auto flex flex-col h-full justify-center items-start md:items-center lg:text-center px-[clamp(2rem,3rem)] relative z-10">
          {/* Hero text */}
          <header className="mb-8 md:mb-[clamp(3rem,5rem)] w-full whitespace-pre-line md:text-center md:items-center mx-auto flex flex-col justify-center gap-4">
            <h1 className="text-[clamp(var(--text-3xl),var(--text-7xl))] leading-[clamp(2.2rem,5rem)]">
              Производство твоего бренда
            </h1>
            <p className="text-[clamp(var(--text-lg),var(--text-2xl))] max-w-4xl font-thin">
              Полный цикл производства косметики под вашим брендом от разработки
              рецептуры до готовой продукции за 7 дней
            </p>
            <div className="md:hidden">
              <ConsultationButton />
            </div>
          </header>

          {/* Two-column container: Capabilities text and Consultation form */}
          <div className="w-full grid md:grid-cols-2 gap-8 lg:gap-12 text-left">
            {/* Left column: Capabilities text */}
            <div className="flex flex-col gap-4 md:items-start">
              <h2 className="text-[clamp(var(--text-2xl),var(--text-4xl))] font-medium">
                Наши возможности
              </h2>
              <ul className="space-y-3 text-[clamp(var(--text-base),var(--text-xl))] font-light mb-4 list-none">
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>Изготовление косметики от 7 дней</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>Индивидуальные рецептуры, дизайн и упаковка</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>Уходовая косметика для лица, тела и волос</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Полный спектр: кремы, гели, сыворотки, шампуни, масла,
                    бальзамы, патчи, BB, CC
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>Сертификация и присвоение марки «Честный знак»</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>Небольшие и крупные партии</span>
                </li>
                <li className="flex items-start">
                  <ChevronRightIcon className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Создание бренда, концепции, дизайна, упаковки и рецептуры
                    «под ключ»
                  </span>
                </li>
              </ul>
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <BriefButton />
                <AdvantagesButton />
              </div>
            </div>

            {/* Right column: Consultation form */}
            <div
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg"
              id="consultation-form"
            >
              <h3 className="text-[clamp(var(--text-xl),var(--text-2xl))] font-medium mb-4 text-neutral-900">
                Консультация специалиста
              </h3>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Этапы разработки */}
      <section className="pt-[clamp(5rem,7rem)]" id="workflow">
        <header className="px-[clamp(2rem,3rem)] mb-[clamp(2rem,3rem)]">
          <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] font-semibold md:text-center">
            Этапы разработки
          </h2>
        </header>
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
          <WorkflowCards />
        </div>
      </section>

      {/* Наше производство */}
      <section
        id="advantages"
        className="2xl:px-[clamp(5rem,9rem)] px-0 mt-[clamp(5rem,9rem)] mb-[clamp(2rem,3rem)]"
      >
        <div className="max-w-7xl bg-base-300 md:mx-auto lg:rounded-4xl md:text-center px-[clamp(2rem,3rem)] py-[clamp(5rem,7rem)]">
          <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] leading-[clamp(2.2rem,4rem)] font-semibold mb-[clamp(1rem,2rem)]">
            Наше производство
          </h2>
          <p className="text-[clamp(var(--text-lg),var(--text-2xl))] font-thin max-w-4xl lg:mx-auto mb-[clamp(2rem,3rem)]">
            Современное, профессиональное оборудование позволяет выпускать
            продукцию высокого качества, соответствуя пожеланиям заказчика.
          </p>
          <div className="md:rounded-4xl overflow-hidden md:shadow-2xl shadow-gray-400">
            <PlayerComponent />
          </div>
        </div>
      </section>

      {/* Список преимуществ */}
      <section className="max-w-5xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="lg:p-6 flex items-start">
            <CheckBadgeIcon className="w-7 h-7 text-green-500 flex-shrink-0 mr-4" />
            <div>
              <h4 className="font-semibold text-xl mb-1 text-neutral-900">
                Контроль качества
              </h4>
              <p className="text-neutral-700 text-lg">
                Вся производимая нами продукция проходит анализ
                в&nbsp;собственной лаборатории, оснащенной современным
                оборудованием (микробиологический контроль). Контроль качества
                осуществляется с&nbsp;преподготовки цеха к&nbsp;производству,
                поставки компонентов и&nbsp;до&nbsp;конечной упаковки продукции.
              </p>
            </div>
          </div>
          <div className="lg:p-6 flex items-start">
            <CheckBadgeIcon className="w-7 h-7 text-green-500 flex-shrink-0 mr-4" />
            <div>
              <h4 className="font-semibold text-xl mb-1 text-neutral-900">
                Полный цикл
              </h4>
              <p className="text-neutral-700 text-lg">
                Предложим готовые и&nbsp;нестандартные решения и&nbsp;создадим
                качественный, уникальный продукт, при лучшей стоимости, так как
                мы&nbsp;заинтересованы в&nbsp;успехе вашего бизнеса. Поможем
                создать уникальный дизайн, упаковку, нестандартную этикетку.
              </p>
            </div>
          </div>
          <div className="lg:p-6 flex items-start">
            <CheckBadgeIcon className="w-7 h-7 text-green-500 flex-shrink-0 mr-4" />
            <div>
              <h4 className="font-semibold text-xl mb-1 text-neutral-900">
                Уникальность
              </h4>
              <p className="text-neutral-700 text-lg">
                Сможем предложить готовые решения, а&nbsp;также разработать
                эксклюзивные рецептуры в&nbsp;кротчайшие сроки под ваши
                потребности. Продукция приобретёт индивидуальные
                органолептические свойства: ароматы, цвет, текстуру,
                а&nbsp;также желаемое действие.
              </p>
            </div>
          </div>
          <div className="lg:p-6 flex items-start">
            <CheckBadgeIcon className="w-7 h-7 text-green-500 flex-shrink-0 mr-4" />
            <div>
              <h4 className="font-semibold text-xl mb-1 text-neutral-900">
                Сроки изготовления
              </h4>
              <p className="text-neutral-700 text-lg">
                Выполнение заказа с&nbsp;момента утверждения технического
                задания и&nbsp;заключения договора производства
                и&nbsp;до&nbsp;момента отгрузки готовой продукции составляет
                от&nbsp;семи рабочих дней. Конкретные сроки зависят
                от&nbsp;сложности рецептуры и&nbsp;объема партии.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Кто мы? */}
      <section
        id="about"
        className="mt-[clamp(5rem,9rem)] mb-[clamp(2rem,3rem)]"
      >
        <div className="max-w-7xl bg-base-300 md:mx-auto xl:rounded-4xl grid md:grid-cols-2 gap-4 lg:gap-12 px-[clamp(2rem,3rem)] py-[clamp(5rem,7rem)]">
          <div className="flex items-center justify-center mb-8 md:mb-0">
            <img
              src="/images/we.jpeg"
              alt="Кто мы"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-[clamp(var(--text-2xl),var(--text-4xl))] leading-[clamp(2rem,3rem)] font-semibold mb-[clamp(1rem,2rem)]">
              Кем мы являемся?
            </h2>
            <p className="text-[clamp(var(--text-lg),var(--text-xl))] font-thin max-w-4xl mb-3">
              ООО &laquo;Демидов Люкс СПА&raquo;&nbsp;&mdash; перспективный
              российский производитель уходовой и&nbsp;профессиональной
              косметики для лица, тела и&nbsp;волос, в&nbsp;том числе для
              SPA‑процедур, с&nbsp;2014&nbsp;года. Компания является
              многократным участником российских и&nbsp;международных выставок
              производителей косметики, а&nbsp;также действующим членом
              Московского Экспортного и&nbsp;Российского Экспортного центров.
            </p>
            <p className="text-[clamp(var(--text-lg),var(--text-xl))] font-thin max-w-4xl">
              В&nbsp;компании работают опытные профессионалы. Разработка
              продукции ведётся в&nbsp;собственной московской лаборатории. Есть
              два производства на&nbsp;территории&nbsp;г. Москвы и&nbsp;ближнего
              Подмосковья. Обеспечивается полный цикл производства&nbsp;&mdash;
              от&nbsp;идеи до&nbsp;выпуска продукции в&nbsp;короткие сроки.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pt-[clamp(2rem,3rem)] pb-[clamp(3rem,5rem)]">
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
          <header className="mb-[clamp(3rem,4rem)]">
            <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] font-semibold md:text-center mb-[clamp(1rem,2rem)] leading-tight md:leading-normal">
              Часто задаваемые вопросы
            </h2>
            <p className="text-[clamp(var(--text-lg),var(--text-xl))] max-w-3xl mx-auto md:text-center text-neutral-700">
              Ответы на самые популярные вопросы о нашем производстве косметики
            </p>
          </header>

          <Faq />
        </div>
      </section>

      {/* Order brief form */}
      <section className="pt-10 md:pt-[clamp(2rem,3rem)] bg-[linear-gradient(to_bottom,white_0%,white_80%,oklch(96%_0_0)_80%,oklch(96%_0_0)_100%)] md:pb-20" id="order-form">
        <div className="max-w-4xl bg-base-300 md:bg-white md:mx-auto xl:rounded-4xl md:shadow-2xl md:shadow-gray-400 flex flex-col gap-2">
          <Form />
        </div>
      </section>

      {/* Footer with contacts */}
      <footer id="contacts" className="bg-base-300">
        <div className="max-w-4xl mx-auto px-[clamp(2rem,3rem)] pb-[clamp(3rem,5rem)] md:pt-0 pt-[clamp(3rem,5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact phones */}
            <div>
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Телефон
              </h4>
              <div className="space-y-2">
                <PhoneButton />
              </div>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Email
              </h4>
              <EmailButton />
            </div>

            {/* Social media */}
            <div className="flex flex-col items-center">
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Мессенджеры
              </h4>
              <div className="flex space-x-4">
                <TelegramButton />
                <WhatsAppButton />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] py-[clamp(1rem,2rem)]">
        <p className="text-neutral-700 text-center text-sm">
          © 2025 ООО «Демидов Люкс СПА»
          <br />
          ИНН 7751525117, КПП 775001001, ОКПО 42943661, ОГРН 5147746230297
          <br />
          Все права защищены
        </p>
      </div>

      {/* Floating Brief Button */}
      <FloatingBriefButton />
    </>
  );
}
