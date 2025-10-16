"use client";

import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface WorkflowCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

function WorkflowCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: WorkflowCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLLIElement>({
    threshold: 1.0,
    rootMargin: "-10% 0px -10% 0px",
    triggerOnce: false,
  });

  return (
    <li
      ref={ref}
      className={`flex flex-col items-center transition-all duration-300 md:hover:shadow-2xl md:rounded-4xl overflow-hidden group ${
        isIntersecting ? "shadow-2xl" : ""
      } md:shadow-none`}
    >
      <div className="grow flex-col gap-2 items-center 2xl:max-w-none w-full bg-base-300 p-[2rem]">
        <div className="flex justify-center items-center lg:mb-4">
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full h-auto object-cover transition-all duration-300 ${
              isIntersecting ? "grayscale-0" : "grayscale"
            } md:grayscale md:group-hover:grayscale-0`}
            sizes="(max-width: 1024px) 120px, 180px"
            loading="lazy"
          />
        </div>
        <header>
          <h3 className="lg:text-center text-xl leading-12 font-semibold">
            {title}
          </h3>
          <p className="text-sm lg:text-center">{description}</p>
        </header>
      </div>
    </li>
  );
}

export default function WorkflowCards() {
  const cards = [
    {
      imageSrc: "/images/consult.jpeg",
      imageAlt: "Консультация",
      title: "Консультация",
      description: "Обсуждаем заказ, предлагаем рецептуры",
    },
    {
      imageSrc: "/images/contract.jpeg",
      imageAlt: "Договор",
      title: "Договор",
      description:
        "Заключаем договор, получаем предоплату, изготавливаем образцы",
    },
    {
      imageSrc: "/images/test.jpeg",
      imageAlt: "Тестирование",
      title: "Тестирование",
      description: "Передаём Вам для тестирования и утверждения образцы.",
    },
    {
      imageSrc: "/images/production.jpeg",
      imageAlt: "Производство",
      title: "Производство",
      description:
        "Запускаем производство продукции на основе утверждённых образцов.",
    },
  ];

  return (
    <ul className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,2rem)]">
      {cards.map((card, index) => (
        <WorkflowCard
          key={index}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          title={card.title}
          description={card.description}
        />
      ))}
    </ul>
  );
}
