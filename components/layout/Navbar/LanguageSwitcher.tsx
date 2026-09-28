"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const toggle = () => {
    const next = isAr ? "en" : "ar";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  return (
    <button onClick={toggle} className="lang-toggle" style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 18, lineHeight: 1 }}>🇦🇪</span>
      <span>{isAr ? "EN" : "AR"}</span>
    </button>
  );
}