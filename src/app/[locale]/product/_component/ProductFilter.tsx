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
      {/* Filter options */}
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="price-range">Price range</label>
        <input
          id="price-range"
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
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="category">Category</label>
        <select
          name=""
          id="category"
          value={filterOption.categoryId}
          onChange={(e) =>
            setFilterOption((old) => {
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
        </select>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="sub-category">SubCategory</label>
        <select
          name=""
          id="sub-category"
          value={filterOption.subCategoryId}
          onChange={(e) =>
            setFilterOption((old) => {
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
      </div>
    </div>
  );
}
