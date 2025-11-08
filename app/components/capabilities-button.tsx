"use client";

import reachGoal from "../helpers/metrika";

export default function BriefButton() {
  return (
    <a
      href="#capabilities"
      className="btn btn-xl btn-primary btn-outline w-full md:w-auto"
      onClick={() => reachGoal("click_capabilities_button")}
    >
      Наши возможности
    </a>
  );
}
