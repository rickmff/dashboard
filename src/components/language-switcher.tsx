"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale, locales } from "@/i18n/settings";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-card shadow-md rounded-md border border-border z-50">
          <ul className="py-1">
            <li>
              <button
                onClick={() => changeLanguage("en")}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors",
                  locale === "en" && "font-medium text-primary"
                )}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => changeLanguage("pt")}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors",
                  locale === "pt" && "font-medium text-primary"
                )}
              >
                Português
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}