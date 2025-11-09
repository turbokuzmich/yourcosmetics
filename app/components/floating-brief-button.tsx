"use client";

import { useEffect, useState } from "react";
import reachGoal from "../helpers/metrika";

export default function FloatingBriefButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const formSection = document.getElementById("order-form");
    if (!formSection) return;

    // Use IntersectionObserver to efficiently track form visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when form is NOT visible (scrolled past)
        // entry.isIntersecting === false means form is outside viewport
        setIsVisible(!entry.isIntersecting);
      },
      {
        // Trigger when any part of the form enters/leaves viewport
        threshold: 0,
        // Small rootMargin to account for any edge cases
        rootMargin: "0px",
      }
    );

    observer.observe(formSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    reachGoal("click_brief_form_button");
    const formSection = document.getElementById("order-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 btn btn-secondary btn-lg shadow-2xl rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Перейти к форме заявки"
      title="Оставить заявку"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-6 h-6 md:w-7 md:h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </button>
  );
}
