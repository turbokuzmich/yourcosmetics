import Player from "next-video/player";
import MediaThemeDemuxed2022 from "player.style/demuxed-2022/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Form from "./components/form";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      {/* Шапка */}
      <Header />
      {/* Видео */}
      <section className="bg-base-300 relative pt-[clamp(5rem,9rem)] pb-[clamp(5rem,9rem)]">
        <div className="max-w-7xl mx-auto flex flex-col h-full justify-center items-start md:items-center lg:text-center px-[clamp(2rem,3rem)] relative z-10 mb-[clamp(3rem,3rem)]">
          <header className="mb-8 w-full whitespace-pre-line md:text-center md:items-center mx-auto flex flex-col justify-center gap-4">
            <h1 className="text-[clamp(var(--text-3xl),var(--text-7xl))] leading-[clamp(2.2rem,5rem)] font-semibold">
              Производство твоего бренда
            </h1>
            <p className="text-[clamp(var(--text-lg),var(--text-2xl))] max-w-4xl">
              Easily record and share AI-powered video messages with your
              teammates and customers to supercharge productivity
            </p>
          </header>
          <div>
            <button className="btn btn-xl btn-primary">Оставить заявку</button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
          <div className="rounded-4xl overflow-hidden shadow-2xl shadow-gray-600">
            <Player src="/video/video.mp4" theme={MediaThemeDemuxed2022} />
          </div>
        </div>
      </section>

      {/* Наши возможности */}
      <section className="pt-[clamp(5rem,9rem)] pb-[clamp(5rem,9rem)]">
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0 flex flex-col gap-4">
          <h2 className="text-[clamp(var(--text-2xl),var(--text-5xl))] font-semibold md:text-center">
            Наши возможности
          </h2>
          <p className="text-[clamp(var(--text-lg),var(--text-2xl))] max-w-3xl mx-auto md:text-center">
            Изготовление косметической продукции для вашего бренда
            от&nbsp;7&nbsp;дней с&nbsp;момента обращения, а&nbsp;также
            индивидуальные разработки продукции с&nbsp;уникальными рецептурами,
            дизайном и&nbsp;упаковкой &laquo;под ключ&raquo;.
          </p>
          <p className="text-[clamp(var(--text-lg),var(--text-2xl))] max-w-3xl mx-auto md:text-center">
            Разработаем бренд, концепцию, дизайн, упаковку, рецептуры
            и&nbsp;выпустим продукцию под вашей торговой маркой.
          </p>
        </div>
      </section>

      {/* Как мы работаем */}
      <section>
        <header className="px-[clamp(2rem,3rem)] mb-[clamp(2rem,3rem)]">
          <h2 className="text-[clamp(var(--text-3xl),var(--text-6xl))] font-semibold md:text-center">
            Как мы работаем
          </h2>
        </header>
        <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] 2xl:px-0">
          <ul className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,2rem)]">
            <li className="flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl rounded-4xl overflow-hidden">
              <div className="grow grid grid-cols-2 gap-2 items-center lg:grid-cols-1 lg:block lg:grow 2xl:max-w-none w-full bg-green-200 p-[clamp(1rem,2rem)]">
                <div className="col-span-1 flex justify-center items-center lg:mb-4">
                  <img
                    src="/images/consult.jpeg"
                    alt="Консультация"
                    className="w-full h-auto max-w-[180px] max-h-[120px] object-cover"
                    sizes="(max-width: 1024px) 120px, 180px"
                    loading="lazy"
                  />
                </div>
                <header>
                  <h3 className="lg:text-center text-xl leading-12 font-semibold text-green-900">
                    Консультация
                  </h3>
                  <p className="text-green-800 text-sm lg:text-center">
                    Обсуждаем заказ, предлагаем рецептуры
                  </p>
                </header>
              </div>
            </li>
            <li className="flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl rounded-4xl overflow-hidden">
              <div className="grow grid grid-cols-2 gap-2 items-center lg:grid-cols-1 lg:block lg:grow 2xl:max-w-none w-full bg-violet-200 p-[clamp(1rem,2rem)]">
                <div className="col-span-1 flex justify-center items-center lg:mb-4">
                  <img
                    src="/images/contract.jpeg"
                    alt="Консультация"
                    className="w-full h-auto max-w-[180px] max-h-[120px] object-cover"
                    sizes="(max-width: 1024px) 120px, 180px"
                    loading="lazy"
                  />
                </div>
                <header>
                  <h3 className="lg:text-center text-xl leading-12 font-semibold text-violet-900">
                    Договор
                  </h3>
                  <p className="text-violet-800 text-sm lg:text-center">
                    Заключаем договор, получаем предоплату, изготавливаем
                    образцы
                  </p>
                </header>
              </div>
            </li>
            <li className="flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl rounded-4xl overflow-hidden">
              <div className="grow grid grid-cols-2 gap-2 items-center lg:grid-cols-1 lg:block lg:grow 2xl:max-w-none w-full bg-sky-200 p-[clamp(1rem,2rem)]">
                <div className="col-span-1 flex justify-center items-center lg:mb-4">
                  <img
                    src="/images/test.jpeg"
                    alt="Консультация"
                    className="w-full h-auto max-w-[180px] max-h-[120px] object-cover"
                    sizes="(max-width: 1024px) 120px, 180px"
                    loading="lazy"
                  />
                </div>
                <header>
                  <h3 className="lg:text-center text-xl leading-12 font-semibold text-sky-900">
                    Тестирование
                  </h3>
                  <p className="text-sky-800 text-sm lg:text-center">
                    Передаём Вам для тестирования и утверждения образцы.
                  </p>
                </header>
              </div>
            </li>
            <li className="flex flex-col items-center transition-shadow duration-300 hover:shadow-2xl rounded-4xl overflow-hidden">
              <div className="grow grid grid-cols-2 gap-2 items-center lg:grid-cols-1 lg:block lg:grow 2xl:max-w-none w-full bg-pink-200 p-[clamp(1rem,2rem)]">
                <div className="col-span-1 flex justify-center items-center lg:mb-4">
                  <img
                    src="/images/production.jpeg"
                    alt="Консультация"
                    className="w-full h-auto max-w-[180px] max-h-[120px] object-cover"
                    sizes="(max-width: 1024px) 120px, 180px"
                    loading="lazy"
                  />
                </div>
                <header>
                  <h3 className="lg:text-center text-xl leading-12 font-semibold text-pink-900">
                    Производство
                  </h3>
                  <p className="text-pink-800 text-sm lg:text-center">
                    Запускаем производство продукции на основе утверждённых
                    образцов.
                  </p>
                </header>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Наши преимущества */}
      <section className="2xl:px-[clamp(5rem,9rem)] px-0 mt-[clamp(5rem,9rem)] mb-[clamp(2rem,3rem)]">
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
          <div className="p-6 flex items-start">
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
          <div className="p-6 flex items-start">
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
          <div className="p-6 flex items-start">
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
          <div className="p-6 flex items-start">
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
      <section className="mt-[clamp(5rem,9rem)] mb-[clamp(2rem,3rem)] text-white">
        <div className="max-w-7xl bg-neutral md:mx-auto xl:rounded-4xl grid md:grid-cols-2 gap-4 lg:gap-12 px-[clamp(2rem,3rem)] py-[clamp(5rem,7rem)]">
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
            <p className="text-[clamp(var(--text-lg),var(--text-xl))] font-thin max-w-4xl">
              ООО &laquo;Демидов Люкс СПА&raquo; перспективный российский
              производитель уходовой и&nbsp;профессиональной косметики для лица,
              тела и&nbsp;волос, в&nbsp;том числе, для SPA-процедур
              с&nbsp;2009&nbsp;года, многократный участник Российских
              и&nbsp;Международных выставок производителей косметики,
              действующий член Московского Экспортного и&nbsp;Российского
              Экспортного центров. В&nbsp;компании работают опытные
              профессионалы. Разработка продукции в&nbsp;собственной Московской
              лаборатории. Два производства на&nbsp;территории&nbsp;г. Москвы
              и&nbsp;ближнего Подмосковья. Полный цикл производства от&nbsp;идеи
              до&nbsp;выпуска продукции в&nbsp;короткие сроки.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-[clamp(2rem,3rem)]">
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
                  Минимальный объем заказа зависит от типа продукции. Для
                  большинства позиций минимальная партия составляет от 100 до
                  500 единиц. Точный объем обсуждается индивидуально в
                  зависимости от сложности рецептуры и упаковки.
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
                  Разработка новой рецептуры занимает от 3 до 14 рабочих дней в
                  зависимости от сложности продукта и ваших требований. Простые
                  варианты на основе базовых формул готовы быстрее, уникальные
                  разработки требуют больше времени.
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
                  Да, мы предоставляем все необходимые документы: сертификаты
                  соответствия, декларации о соответствии, протоколы испытаний и
                  другие документы согласно требованиям технического регламента
                  Таможенного союза.
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
                  Конечно! Мы предлагаем полный цикл услуг, включая разработку
                  дизайна упаковки, этикеток и брендинга. Наша команда
                  дизайнеров поможет создать уникальный и привлекательный образ
                  для вашего продукта.
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
                  Мы производим широкий спектр косметической продукции: кремы
                  для лица и тела, маски, сыворотки, шампуни, бальзамы, скрабы,
                  профессиональную косметику для SPA-процедур и многое другое.
                  Работаем как с готовыми рецептурами, так и разрабатываем
                  индивидуальные формулы.
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
                  После обсуждения всех деталей заказа мы заключаем договор.
                  Работаем по схеме предоплаты: 50% при заключении договора,
                  оставшиеся 50% перед отгрузкой готовой продукции. Возможны
                  индивидуальные схемы оплаты для постоянных клиентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order brief form */}
      <section
        className="mt-[clamp(5rem,9rem)] pb-[clamp(2rem,3rem)] bg-linear-to-b"
        style={{
          "--tw-gradient-stops":
            "var(--color-base-100) 0,var(--color-base-100) 92%,var(--color-base-300) 85%,var(--color-base-300) 100%",
        }}
      >
        <div className="max-w-4xl bg-white md:mx-auto xl:rounded-4xl shadow-2xl shadow-gray-600/20 flex flex-col gap-2">
          <Form />
        </div>
      </section>

      {/* Footer with contacts */}
      <footer className="bg-base-300">
        <div className="max-w-4xl mx-auto px-[clamp(2rem,3rem)] pb-[clamp(3rem,5rem)] pt-[clamp(1rem,2rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact phones */}
            <div>
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Телефон
              </h4>
              <div className="space-y-2">
                <a
                  href="tel:+74951234567"
                  className="flex items-center justify-center text-2xl font-semibold text-neutral-700 hover:text-primary transition-colors"
                >
                  +7 (495) 123-45-67
                </a>
              </div>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Email
              </h4>
              <a
                href="mailto:info@demidov-lux.ru"
                className="flex items-center justify-center text-2xl font-semibold text-neutral-700 hover:text-primary transition-colors"
              >
                info@deluxspa.ru
              </a>
            </div>

            {/* Social media */}
            <div className="flex flex-col items-center">
              <h4 className="text-xl mb-2 text-center text-neutral-700">
                Мессенджеры
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://t.me/demidovlux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Telegram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/79161234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-[clamp(2rem,3rem)] py-[clamp(1rem,2rem)]">
        <p className="text-neutral-700 text-center text-sm">
          © 2025 ООО "Демидов Люкс СПА". Все права защищены.
        </p>
      </div>
    </>
  );
}
