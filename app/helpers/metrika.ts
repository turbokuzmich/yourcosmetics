import { METRIKA_ID } from "../constants";

type Goal = "click_brief_form_button" | "submit_brief_form";

export default function reachGoal(goal: Goal) {
  if ("ym" in window) {
    (window.ym as any)(METRIKA_ID, "reachGoal", goal);
  }
}
