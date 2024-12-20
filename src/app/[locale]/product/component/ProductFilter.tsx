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
import LocaleContext from "../../component/LocaleContext";

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filterOption.categoryId.split(",")
  );
  useEffect(() => {
    setFilterOption((old) => {
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
            setFilterOption((old) => {
              return {
                ...old,
                minPrice: parseInt(e.target.value),
              };
            })
          }
          type="number"
          value={filterOption.minPrice}
          className="w-11 px-1 text-black rounded"
        />
        <span>-</span>
        <input
          onChange={(e) =>
            setFilterOption((old) => {
              return {
                ...old,
                maxPrice: parseInt(e.target.value),
              };
            })
          }
          type="number"
          value={
            filterOption.maxPrice == Infinity
              ? "Infinity"
              : filterOption.maxPrice
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
          className="rounded-md border border-[rgba(128, 128, 128, 0.8)] px-2"
          onClick={() => setSelectedCategories([])}
        >
          {dict.product_filter_clear_button_text}
        </button>
      </div>
      <button onClick={() => setShowFilter(false)}>x</button>
    </>
  );
}
