"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 flex flex-col justify-center backface-hidden z-30 bg-white transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-2xl" : "shadow-none"
      }`}
      style={{
        boxShadow: isScrolled
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.05), 0 25px 25px -5px rgba(0, 0, 0, 0.05)"
          : "none",
      }}
    >
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
  );
}
