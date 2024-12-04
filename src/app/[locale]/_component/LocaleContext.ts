"use client";

import { Dictionary } from "@/model";
import { createContext } from "react";

const LocaleContext = createContext<Dictionary>({
  title: "",
  layout_title: "",
  user_login: "",
  product_total_1: "",
  product_total_2: "",
});
export default LocaleContext;
