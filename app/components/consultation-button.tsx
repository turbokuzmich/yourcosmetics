"use client";

import reachGoal from "../helpers/metrika";

export default function ConsultationButton() {
  return (
    <a
      href="#consultation-form"
      className="btn btn-outline btn-lg w-full btn-secondary"
      onClick={() => reachGoal("click_consultation_form_button")}
    >
      Получить консультацию
    </a>
  );
}
