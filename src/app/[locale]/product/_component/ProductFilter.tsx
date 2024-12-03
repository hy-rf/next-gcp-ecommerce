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
    <div className="fixed bottom-[7rem] min-w-40 max-w-80 right-4 p-4 rounded-lg shadow-md bg-header-gray">
      {/* Filter options */}
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="price-range">Price range</label>
        <input
          id="price-range"
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
          className="w-10 p-1 text-black rounded"
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
          className="w-10 p-1 text-black rounded"
        />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <CategoryFilterCheckboxGroup
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      {/* <label htmlFor="category">Category</label>
        <select
          name=""
          id="category"
          value={localOption.categoryId}
          onChange={(e) =>
            setLocalOption((old) => {
              return {
                ...old,
                categoryId: e.target.value,
              };
            })
          }
        >
          <option value="">Choose Category</option>
          <option value="OhFPcQGt5B8iJ6TywjgS">Learning</option>
          <option value="ujoJM3sLWQLd2G4QGYxu">Books</option>
        </select> */}

      {/* <div className="flex items-center gap-2 mt-2">
        <label htmlFor="sub-category">SubCategory</label>
        <select
          name=""
          id="sub-category"
          value={localOption.subCategoryId}
          onChange={(e) =>
            setLocalOption((old) => {
              return {
                ...old,
                subCategoryId: e.target.value,
              };
            })
          }
        >
          <option value="">Choose Sub Category</option>
          <option value="8NTCSFSyKE1fXldHCDiu">Sketching</option>
          <option value="nTvLmo7vdZYMx6NMWTsk">Health</option>
          <option value="ooxykUV2QxMoQ39PYwiD">Language</option>
        </select>
      </div> */}
      <button
        className="rounded-md"
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
