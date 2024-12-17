"use client";

import { Dictionary } from "@/model";
import { createContext } from "react";

// Helper function to initialize all fields with an empty string
const initializeDictionary = (): Dictionary => {
  return new Proxy(
    {},
    {
      get: () => "",
    }
  ) as Dictionary;
};

const LocaleContext = createContext<{ locale: string; dict: Dictionary }>({
  locale: "en",
  dict: initializeDictionary(),
});
export default LocaleContext;
