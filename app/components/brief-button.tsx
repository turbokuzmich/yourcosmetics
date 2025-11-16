"use client";

import reachGoal from "../helpers/metrika";

export default function BriefButton() {
  return (
    <a
      href="#order-form"
      className="btn btn-xl btn-secondary"
      onClick={() => reachGoal("click_brief_form_button")}
    >
      Рассчитать стоимость
    </a>
  );
}
