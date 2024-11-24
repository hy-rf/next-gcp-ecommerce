"use client";

import { useState, ReactNode } from "react";
import LocaleContext from "./LocaleContext"; // Import the context

type LocaleProviderProps = {
  children: ReactNode;
};

export default function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale] = useState<string>("en-US"); // Default locale

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
