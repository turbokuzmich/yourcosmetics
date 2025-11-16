import { METRIKA_ID } from "../constants";

type BriefGoal =
  | "click_brief_form_button" // клик по кнопке «Рассчитать стоимость»
  | "submit_brief_form" // успешная отправка формы расчета стоимости
  | "error_submit_brief_form" // ошибка отправки формы расчета стоимости
  | "click_send_brief_button"; // клик по кнопке «Отправить бриф»

type VideoGoal = "play_video"; // просмотр видео

type ContactsGoal =
  | "click_phone"
  | "click_email"
  | "click_telegram"
  | "click_whatsapp";

type MenuGoal =
  | "click_menu_about" // клик по пункту меню «О нас»
  | "click_menu_workflow" // клик по пункту меню «Этапы производства»
  | "click_menu_advantages" // клик по пункту меню «Производство»
  | "click_menu_faq" // клик по пункту меню «FAQ»
  | "click_menu_contacts"; // клик по пункту меню «Контакты»

type FaqGoal = "click_faq"; // клик по faq

type UpButtonGoal = "click_up_button"; // клик по кнопке вверх

type ConsultationFormGoal =
  | "click_consultation_form_button" // клик по кнопке «Получить консультацию»
  | "submit_consultation_form" // успешная отправка формы консультации
  | "error_submit_consultation_form" // ошибка отправки формы консультации
  | "click_send_consultation_button"; // клик по кнопке «Отправить заявку»

type MobileHeaderGoal =
  | "click_mobile_header_consultation_button"
  | "click_mobile_header_contacts_button";

type AdvantagesButtonGoal = "click_advantages_button"; // клик по кнопке «Наше производство»

export type Goal =
  | BriefGoal
  | VideoGoal
  | ConsultationFormGoal
  | AdvantagesButtonGoal
  | ContactsGoal
  | MenuGoal
  | FaqGoal
  | UpButtonGoal
  | MobileHeaderGoal;

export default function reachGoal(goal: Goal) {
  if ("ym" in window) {
    (window.ym as any)(METRIKA_ID, "reachGoal", goal);
  }
}
