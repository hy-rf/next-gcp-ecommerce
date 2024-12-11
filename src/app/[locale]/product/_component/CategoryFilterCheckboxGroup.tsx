"use client";

import { Category } from "@/model";
import { Dispatch, SetStateAction, useContext } from "react";
import LocaleContext from "../../_component/LocaleContext";

export default function CategoryFilterCheckboxGroup({
  selectedCategories,
  setSelectedCategories,
  categories,
}: {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  categories: Category[];
}) {
  const { locale } = useContext(LocaleContext);
  const handleCheckboxChange = (value: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(value)
          ? prev.filter((val) => val !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {categories.map((option) => (
        <div key={option.id}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value={option.id}
              checked={selectedCategories.includes(option.id!)}
              onChange={() => handleCheckboxChange(option.id!)}
            />
            <p className="leading-loose">
              {locale === "en-US"
                ? option.name
                : (option[`name-${locale}`] as string)}
            </p>
          </label>
        </div>
      ))}
    </div>
  );
}
