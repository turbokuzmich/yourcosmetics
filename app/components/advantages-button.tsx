"use client";

import reachGoal from "../helpers/metrika";

export default function AdvantagesButton() {
  return (
    <a
      href="#advantages"
      className="btn btn-outline btn-lg btn-primary"
      onClick={() => reachGoal("click_advantages_button")}
    >
      Наше производство
    </a>
  );
}
