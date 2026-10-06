"use client";

import { useEffect } from "react";
import { setLang, storedLang } from "@/lib/i18n/translator";

/** Applies the visitor's saved language once the page is interactive. */
export default function I18nRuntime() {
  useEffect(() => {
    if (storedLang() === "ar") void setLang("ar");
  }, []);
  return null;
}
