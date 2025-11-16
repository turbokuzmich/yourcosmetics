"use client";

import reachGoal from "../helpers/metrika";

export const Faq = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-4">
        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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
              Минимальный заказ — от 100 единиц товара. Окончательный размер и
              стоимость партии обсуждаются с уполномоченным сотрудником
              производства.
            </p>
          </div>
        </div>

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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
              Заказчик может по своему усмотрению выбрать уже разработанные и
              проверенные рецептуры из нашего ассортимента, ознакомиться с
              продуктом, обсудить возможные модификации или заказать партию по
              уже отработанному рецепту.
            </p>
          </div>
        </div>

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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
              требуется проведение лабораторных исследований на стабильность,
              оценка органолептических свойств со временем, а также анализы на
              микробиологическую безопасность.
            </p>
          </div>
        </div>

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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
              Мы обеспечиваем сертификацию вашей продукции, а также оформляем
              маркировку «Честный Знак» и присваиваем штрихкоды товарам.
            </p>
          </div>
        </div>

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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

        <div
          className="collapse collapse-plus bg-base-200 rounded-2xl"
          onClick={() => reachGoal("click_faq")}
        >
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
              договорённости, заказчик вносит предоплату в размере 50% от суммы
              заказа до начала работ. Следующие 20% оплачиваются после
              утверждения рецептуры и образцов, непосредственно перед запуском
              партии в производство. Оставшиеся 30% заказчик оплачивает после
              изготовления партии, но до отгрузки товара. Готовая продукция
              может храниться на складе до 7 календарных дней с момента
              изготовления, в течение которых заказчик должен принять товар.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
