"use client";

import { useState, useEffect } from "react";
import Logo from "./logo";
import type { Goal } from "../helpers/metrika";
import reachGoal from "../helpers/metrika";
import { PhoneIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

type MenuItem = {
  href: string;
  label: string;
  metrika: Goal;
};

const menuItems: MenuItem[] = [
  { href: "#about", label: "О нас", metrika: "click_menu_about" },
  {
    href: "#workflow",
    label: "Этапы разработки",
    metrika: "click_menu_workflow",
  },
  {
    href: "#advantages",
    label: "Производство",
    metrika: "click_menu_advantages",
  },
  { href: "#faq", label: "FAQ", metrika: "click_menu_faq" },
  { href: "#contacts", label: "Контакты", metrika: "click_menu_contacts" },
];

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

  const handleMobileMenuClick = (goal: Goal) => () => {
    reachGoal(goal);
    (document.activeElement as HTMLElement)?.blur();
  };

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
      <nav className="px-[clamp(2rem,3rem)] 2xl:px-0 my-auto relative z-10 h-[5rem] md:h-[6rem]">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-full">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="block w-[6rem] md:w-[8rem] cursor-pointer"
            aria-label="Наверх"
          >
            <Logo />
          </button>

          {/* Desktop Menu - Hidden on mobile, visible from md breakpoint */}
          <div className="hidden md:flex w-full items-center justify-end">
            <ul className="flex flex-row items-center gap-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="menu-link relative px-4 py-2 text-lg font-medium text-base-content hover:text-primary transition-colors duration-200"
                    onClick={() => reachGoal(item.metrika)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button - Visible on mobile, hidden from md breakpoint */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                reachGoal("click_mobile_header_consultation_button");
                document
                  .getElementById("consultation-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-ghost p-2 text-secondary"
              aria-label="Консультация"
              title="Консультация"
            >
              <ChatBubbleLeftRightIcon className="w-7 h-7" />
            </button>

            <button
              onClick={() => {
                reachGoal("click_mobile_header_contacts_button");
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-ghost p-2"
              aria-label="Контакты"
              title="Контакты"
            >
              <PhoneIcon className="w-6 h-6" />
            </button>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                title="Menu"
                className="btn btn-ghost p-0"
              >
                <Bars3Icon className="w-8 h-8" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-base-200"
              >
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-base py-3 px-4 hover:bg-base-100 rounded-lg"
                      onClick={handleMobileMenuClick(item.metrika)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
