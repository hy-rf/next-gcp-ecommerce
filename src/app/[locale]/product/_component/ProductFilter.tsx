"use client";
/* TODO: setFilterOption after clicking apply button
    add local state for this component
 */
import { Category, FilterOptions } from "@/model";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import CategoryFilterCheckboxGroup from "./CategoryFilterCheckboxGroup";
import LocaleContext from "../../_component/LocaleContext";

export default function ProductFilter({
  filterOption,
  setFilterOption,
  setShowFilter,
  categories,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  categories: Category[];
}) {
  const { dict } = useContext(LocaleContext);
  const [localOption, setLocalOption] = useState<FilterOptions>(filterOption);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filterOption.categoryId.split(",")
  );
  useEffect(() => {
    setLocalOption((old) => {
      return {
        ...old,
        ...filterOption,
        categoryId: selectedCategories.filter((ele) => ele !== "").join(","),
      };
    });
  }, [selectedCategories]);
  return (
    <>
      {/* Filter options */}
      <div className="flex items-center gap-2 m-2">
        <label htmlFor="price-range" className="w-8">
          {dict.product_filter_price_label_text}
        </label>
        <input
          onChange={(e) =>
            setLocalOption((old) => {
              return {
                ...old,
                minPrice: parseInt(e.target.value),
              };
            })
          }
          type="number"
          value={localOption.minPrice}
          className="w-11 px-1 text-black rounded"
        />
        <span>-</span>
        <input
          onChange={(e) =>
            setLocalOption((old) => {
              return {
                ...old,
                maxPrice: parseInt(e.target.value),
              };
            })
          }
          type="number"
          value={
            localOption.maxPrice == Infinity ? "Infinity" : localOption.maxPrice
          }
          className="w-11 px-1 text-black rounded"
        />
      </div>
      <div className="items-center gap-2 m-2">
        <CategoryFilterCheckboxGroup
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <button
          className="rounded-md border border-[rgba(128, 128, 128, 0.3)] px-6"
          onClick={() => setSelectedCategories([])}
        >
          {dict.product_filter_clear_button_text}
        </button>
      </div>

      <button
        className="bg-gray-400 rounded-md px-6"
        onClick={() => {
          setFilterOption((old) => {
            return {
              ...old,
              ...localOption,
            };
          });
          setShowFilter(false);
        }}
      >
        {dict.product_filter_apply_button_text}
      </button>
    </>
  );
}
