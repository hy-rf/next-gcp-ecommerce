"use client";

import { ReactNode } from "react";
import LocaleContext from "./LocaleContext"; // Import the context
import { Dictionary } from "@/model";

type LocaleProviderProps = {
  dict: Dictionary;
  children: ReactNode;
};

export default function LocaleProvider({
  children,
  dict,
}: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={dict}>{children}</LocaleContext.Provider>
  );
}
