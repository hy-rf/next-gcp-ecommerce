"use client";

import { Dictionary } from "@/model";
import { createContext } from "react";

const LocaleContext = createContext<Dictionary>({
  title: "",
  layout_title: "",
  user_login: "",
});
export default LocaleContext;
