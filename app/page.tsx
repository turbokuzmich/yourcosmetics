import PlayerComponent from "./components/player";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Form from "./components/form";
import Header from "./components/header";
import WorkflowCards from "./components/workflow-cards";
import Metrika from "./components/metrika";
import BriefButton from "./components/brief-button";
import CapabilitiesButton from "./components/capabilities-button";
import FloatingBriefButton from "./components/floating-button";
import {
  EmailButton,
  PhoneButton,
  TelegramButton,
  WhatsAppButton,
} from "./components/footer-buttons";

export default function Home() {
  return (
    <>
      <Metrika />

      {/* Шапка */}
      <Header />

      {/* Hero Section */}
      <section className="bg-base-100 relative pt-[clamp(3rem,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col h-full justify-center items-start md:items-center lg:text-center px-[clamp(2rem,3rem)] relative z-10">
          <header className="mb-8 w-full whitespace-pre-line md:text-center md:items-center mx-auto flex flex-col justify-center gap-4">
            <h1 className="text-[clamp(var(--text-3xl),var(--text-7xl))] leading-[clamp(2.2rem,5rem)]">
              Производство твоего бренда
            </h1>
            <p className="text-[clamp(var(--text-lg),var(--text-2xl))] max-w-4xl font-thin">
              Полный цикл производства косметики под вашим брендом от разработки
              рецептуры до готовой продукции за 7 дней
            </p>
          </header>
          <div className="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
            <CapabilitiesButton />
            <BriefButton />
          </div>
        </div>
      </section>

      {/* Order brief form */}
      <section id="order-form" className="pt-10 md:pt-[clamp(2rem,3rem)]">
        <div className="max-w-4xl bg-base-300 md:bg-white md:mx-auto xl:rounded-4xl md:shadow-2xl md:shadow-gray-400 flex flex-col gap-2">
          <Form />
        </div>
      </section>

      {/* Наши возможности */}
      <section id="capabilities" className="pt-[clamp(3rem,5rem)]">
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0 flex flex-col gap-4">
          <h2 className="text-[clamp(var(--text-2xl),var(--text-5xl))] font-semibold md:text-center">
            Наши возможности
          </h2>
          <p className="text-[clamp(var(--text-2xl),var(--text-3xl))] font-thin max-w-4xl mx-auto md:text-center">
            Изготовим косметику для вашего бренда от&nbsp;7&nbsp;дней
            с&nbsp;момента обращения, а&nbsp;также выполним индивидуальные
            разработки продукции с&nbsp;уникальными рецептурами, дизайном
            и&nbsp;упаковкой &laquo;под&nbsp;ключ&raquo;.
          </p>
          <p className="text-[clamp(var(--text-base),var(--text-xl))] font-light max-w-3xl mx-auto md:text-center">
            Уходовая и&nbsp;профессиональная косметика для лица, тела, волос,
            кремы, гели, сыворотки, шампуни, масла, бальзамы, патчи, BB,
            СС&nbsp;и&nbsp;многое другое&nbsp;&mdash; всё зависит
            от&nbsp;пожеланий заказчика.
          </p>
          <p className="text-[clamp(var(--text-base),var(--text-xl))] font-light max-w-3xl mx-auto md:text-center">
            Сертифицируем, а также присвоим марку честный знак.
          </p>
          <p className="text-[clamp(var(--text-base),var(--text-xl))] font-light max-w-3xl mx-auto md:text-center">
            Работаем с небольшими и крупными партиями, индивидуальный подход к
            каждому клиенту.
          </p>
          <p className="text-[clamp(var(--text-base),var(--text-xl))] font-light max-w-3xl mx-auto md:text-center">
            Создадим бренд, концепцию, дизайн, упаковку, рецептуры и выпустим
            продукцию под вашей торговой маркой.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-base-100 relative pt-[clamp(3rem,5rem)]">
        <div className="max-w-7xl mx-auto md:px-[clamp(2rem,3rem)] 2xl:px-0">
          <div className="md:rounded-4xl overflow-hidden md:shadow-2xl shadow-gray-400">
            <PlayerComponent />
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="pt-[clamp(5rem,7rem)]">
        <header className="px-[clamp(2rem,3rem)] mb-[clamp(2rem,3rem)]">
          <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] font-semibold md:text-center">
            Как мы работаем
          </h2>
        </header>
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
          <WorkflowCards />
        </div>
      </section>

      {/* Наши преимущества */}
      <section
        id="advantages"
        className="2xl:px-[clamp(5rem,9rem)] px-0 mt-[clamp(5rem,9rem)] mb-[clamp(2rem,3rem)]"
      >
        <div className="max-w-7xl bg-base-300 md:mx-auto lg:rounded-4xl md:text-center px-[clamp(2rem,3rem)] py-[clamp(5rem,7rem)]">
          <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] leading-[clamp(2.2rem,4rem)] font-semibold mb-[clamp(1rem,2rem)]">
            Наши преимущества
          </h2>
          <p className="text-[clamp(var(--text-lg),var(--text-2xl))] font-thin max-w-4xl lg:mx-auto">
            Наши производства оснащены современным, профессиональным
            оборудованием, что позволяет выпускать продукцию высокого качества
            соответствуя пожеланиям заказчика.
          </p>
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

          <div className="max-w-4xl mx-auto space-y-4">
            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о минимальном объеме заказа"
              />
              <div className="collapse-title text-xl font-semibold">
                Какой минимальный объем заказа?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  Минимальный заказ — от 100 единиц товара. Окончательный размер
                  и стоимость партии обсуждаются с уполномоченным сотрудником
                  производства.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о готовых решениях"
              />
              <div className="collapse-title text-xl font-semibold">
                Есть ли у вас готовые «рамочные» решения?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  Заказчик может по своему усмотрению выбрать уже разработанные
                  и проверенные рецептуры из нашего ассортимента, ознакомиться с
                  продуктом, обсудить возможные модификации или заказать партию
                  по уже отработанному рецепту.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о времени разработки рецептуры"
              />
              <div className="collapse-title text-xl font-semibold">
                Сколько времени занимает разработка новой рецептуры?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  Наша компания уделяет особое внимание разработке и воплощению
                  ваших идей в качественные продукты, строго соблюдая стандарты.
                  Процесс создания новой формулы занимает от 30 дней, так как
                  требуется проведение лабораторных исследований на
                  стабильность, оценка органолептических свойств со временем, а
                  также анализы на микробиологическую безопасность.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о сертификатах качества"
              />
              <div className="collapse-title text-xl font-semibold">
                Предоставляете ли вы сертификаты качества?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  Мы обеспечиваем сертификацию вашей продукции, а также
                  оформляем маркировку «Честный Знак» и присваиваем штрихкоды
                  товарам.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о видах косметики"
              />
              <div className="collapse-title text-xl font-semibold">
                Какие виды косметики вы производите?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  Мы выпускаем все виды косметической продукции, за исключением
                  спиртовой парфюмерии и декоративной косметики.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о дизайне упаковки"
              />
              <div className="collapse-title text-xl font-semibold">
                Можете ли вы помочь с дизайном упаковки?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  По желанию клиента компания может взять на себя полный цикл
                  производства — от разработки идеи и концепции бренда до
                  визуализации и выпуска готовой партии. Все опции обсуждаются
                  индивидуально.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-2xl">
              <input
                type="radio"
                name="faq-accordion"
                aria-label="Раскрыть вопрос о процессе оплаты"
              />
              <div className="collapse-title text-xl font-semibold">
                Как происходит процесс оплаты?
              </div>
              <div className="collapse-content">
                <p className="text-neutral-700 text-lg">
                  На первом этапе, после согласования брифа и достижения
                  договорённости, заказчик вносит предоплату в размере 50% от
                  суммы заказа до начала работ. Следующие 20% оплачиваются после
                  утверждения рецептуры и образцов, непосредственно перед
                  запуском партии в производство. Оставшиеся 30% заказчик
                  оплачивает после изготовления партии, но до отгрузки товара.
                  Готовая продукция может храниться на складе до 7 календарных
                  дней с момента изготовления, в течение которых заказчик должен
                  принять товар.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with contacts */}
      <footer id="contacts" className="bg-base-300">
        <div className="max-w-4xl mx-auto px-[clamp(2rem,3rem)] pb-[clamp(3rem,5rem)] pt-[clamp(3rem,5rem)]">
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
