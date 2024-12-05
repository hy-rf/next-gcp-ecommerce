"use client";
/* TODO: setFilterOption after clicking apply button
    add local state for this component
 */
import { FilterOptions } from "@/model";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CategoryFilterCheckboxGroup from "./CategoryFilterCheckboxGroup";

export default function ProductFilter({
  filterOption,
  setFilterOption,
  setShowFilter,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}) {
  const [localOption, setLocalOption] = useState<FilterOptions>(filterOption);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filterOption.categoryId.split(",")
  );
  useEffect(() => {
    setLocalOption((old) => {
      return {
        ...old,
        categoryId: selectedCategories.join(","),
      };
    });
  }, [selectedCategories]);
  return (
    <div className="fixed bottom-28 rounded-lg bg-header-gray flex flex-col right-6 p-4 shadow-md items-center">
      {/* Filter options */}
      <div className="flex items-center gap-2 m-2">
        <label htmlFor="price-range">Price</label>
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
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      <button
        className="bg-gray-400 rounded-md px-6"
        onClick={() => {
          setFilterOption(localOption);
          setShowFilter(false);
        }}
      >
        Apply filter
      </button>
    </div>
  );
}
