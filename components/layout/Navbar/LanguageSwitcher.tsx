"use client";

import { useSyncExternalStore } from "react";
import { getLang, setLang, subscribe } from "@/lib/i18n/translator";

// Arabic isn't implemented yet (no translations / RTL layout), so the toggle is hidden.
// Flip this to true once the i18n setup is in place.
const SHOW_LANGUAGE_SWITCHER = false;

export default function LanguageSwitcher() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as const);
  const isAr = lang === "ar";

  return (
    <button
      type="button"
      onClick={() => void setLang(isAr ? "en" : "ar")}
      className="lang-toggle"
      style={{ display: "flex", alignItems: "center", gap: 6 }}
      aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      lang={isAr ? "en" : "ar"}
      data-no-translate
    >
      <span style={{ fontSize: 18, lineHeight: 1 }} aria-hidden="true">
        🇦🇪
      </span>
      <span>{isAr ? "EN" : "عربي"}</span>
    </button>
  );
}
