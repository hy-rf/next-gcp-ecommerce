"use client";

import { Category, FilterOptions } from "@/model";
import { Dispatch, SetStateAction, useContext } from "react";
import LocaleContext from "../../component/LocaleContext";

export default function CategoryFilterCheckboxGroup({
  filterOptions,
  setFilteredOptions,
  categories,
}: {
  filterOptions: FilterOptions;
  setFilteredOptions: Dispatch<SetStateAction<FilterOptions>>;
  categories: Category[];
}) {
  const { locale } = useContext(LocaleContext);
  async function handleCheckboxChange(value: string) {
    setFilteredOptions((old) => {
      const newCategories = filterOptions.categoryId.includes(value)
        ? filterOptions.categoryId
            .split(",")
            .filter((val) => val !== value)
            .filter((el) => el !== "")
            .join(",")
        : filterOptions.categoryId + "," + value;
      return {
        ...old,
        ...filterOptions,
        categoryId: newCategories,
      };
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((option) => (
        <div key={option.id}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value={option.id}
              checked={filterOptions.categoryId.includes(option.id!)}
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
