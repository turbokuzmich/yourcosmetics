import { METRIKA_ID } from "../constants";

/**
 * клик по faq
 * ошибка отправки формы
 */

export type Goal =
  | "click_brief_form_button" // клик по кнопке «Оставить заявку»
  | "submit_brief_form" // успешная отправка формы заявки
  | "click_capabilities_button" // клик по кнопке «Наши возможности»
  | "play_video" // просмотр видео
  | "click_phone" // клик по телефону
  | "click_email" // клик по электронной почте
  | "click_telegram" // клик по Telegram
  | "click_whatsapp" // клик по WhatsApp
  | "click_send_brief_button" // клик по кнопке «Отправить бриф»
  | "click_menu_about" // клик по пункту меню «О нас»
  | "click_menu_capabilities" // клик по пункту меню «Возможности»
  | "click_menu_advantages" // клик по пункту меню «Преимущества»
  | "click_menu_faq" // клик по пункту меню «FAQ»
  | "click_menu_contacts" // клик по пункту меню «Контакты»
  | "click_faq" // клик по faq
  | "error_submit_brief_form" // ошибка отправки формы
  | "click_up_button"; // клик по кнопке вверх

export default function reachGoal(goal: Goal) {
  if ("ym" in window) {
    (window.ym as any)(METRIKA_ID, "reachGoal", goal);
  }
}
