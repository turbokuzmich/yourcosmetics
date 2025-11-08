"use client";

import reachGoal from "../helpers/metrika";

export default function BriefButton() {
  return (
    <a
      href="#order-form"
      className="btn btn-xl btn-secondary w-full md:w-auto"
      onClick={() => reachGoal("click_brief_form_button")}
    >
      Оставить заявку
    </a>
  );
}
