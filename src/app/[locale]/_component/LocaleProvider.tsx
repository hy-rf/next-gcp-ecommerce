"use client";

import { ReactNode } from "react";
import LocaleContext from "./LocaleContext"; // Import the context
import { Dictionary } from "@/model";

type LocaleProviderProps = {
  locale: string;
  dict: Dictionary;
  children: ReactNode;
};

export default function LocaleProvider({
  children,
  dict,
  locale,
}: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}
