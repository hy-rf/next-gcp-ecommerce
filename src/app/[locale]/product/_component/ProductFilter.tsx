"use client";
/* TODO: setFilterOption after clicking apply button
    add local state for this component
 */
import { FilterOptions } from "@/model";
import { Dispatch, SetStateAction } from "react";

export default function ProductFilter({
  filterOption,
  setFilterOption,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
}) {
  return (
    <div className="fixed bottom-[6rem] bg-gray-900 w-full text-white p-4 rounded-lg shadow-md">
      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Price range</h3>
        <div className="flex items-center gap-2 mt-2">
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
            className="w-16 p-2 text-black rounded"
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
            value={filterOption.maxPrice}
            className="w-16 p-2 text-black rounded"
          />
        </div>
      </div>
    </div>
  );
}
