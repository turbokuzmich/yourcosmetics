import Player from "next-video/player";
import MediaThemeDemuxed2022 from "player.style/demuxed-2022/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <>
      {/* Шапка */}
      <header className="sticky top-0 flex flex-col justify-center backface-hidden z-30 bg-base-100">
        <nav className="px-[clamp(2rem,3rem)] 2xl:px-0 my-auto relative z-10 h-[5rem]">
          <div className="flex items-center justify-between max-w-7xl mx-auto h-full">
            <a href="/">ЛОГОТИП</a>
            <div className="w-full flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li>
                  <a className="btn btn-link btn-lg no-underline">О нас</a>
                </li>
                <li>
                  <a className="btn btn-link btn-lg no-underline">Услуги</a>
                </li>
                <li>
                  <a className="btn btn-link btn-lg no-underline">Контакты</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

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
          <div className="rounded-4xl overflow-hidden shadow-2xl shadow-gray-400">
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
      
    </>
  );
}
