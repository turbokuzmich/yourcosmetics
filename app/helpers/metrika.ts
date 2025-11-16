import { METRIKA_ID } from "../constants";

/**
 * переход в мессенджер
 * клик по номеру телефона
 * клик по электронной почте
 * клик по меню
 * фокус на поле формы
 * клик по кнопке «Отправить бриф»
 * клик по faq
 * ошибка отправки формы
 * клик по кнопке вверх
 */

type Goal =
  | "click_brief_form_button" // клик по кнопке «Оставить заявку»
  | "submit_brief_form" // успешная отправка формы заявки
  | "click_capabilities_button" // клик по кнопке «Наши возможности»
  | "play_video" // просмотр видео
  | "click_phone" // клик по телефону
  | "click_email" // клик по электронной почте
  | "click_menu" // клик по меню
  | "focus_form_field" // фокус на поле формы
  | "click_send_brief_button" // клик по кнопке «Отправить бриф»
  | "click_faq" // клик по faq
  | "error_submit_brief_form" // ошибка отправки формы
  | "click_up_button"; // клик по кнопке вверх

export default function reachGoal(goal: Goal) {
  if ("ym" in window) {
    (window.ym as any)(METRIKA_ID, "reachGoal", goal);
  }
}
