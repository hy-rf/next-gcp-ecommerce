"use client";

import { FilterOptions } from "@/model";
import { Dispatch, SetStateAction, useState } from "react";

export default function ProductSort({
  filterOption,
  setFilterOption,
  setShowSort,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
  setShowSort: Dispatch<SetStateAction<boolean>>;
}) {
  const [sortOption, setSortOption] = useState<string>(
    filterOption.sortOption || "sold-desc"
  );
  const sortOptions = [
    {
      value: "sold-desc",
      labelContent: "Sold DESC",
    },
    {
      value: "sold-asc",
      labelContent: "Sold ASC",
    },
    {
      value: "price-desc",
      labelContent: "Price DESC",
    },
    {
      value: "price-asc",
      labelContent: "Price ASC",
    },
    {
      value: "created-desc",
      labelContent: "Created DESC",
    },
    {
      value: "created-asc",
      labelContent: "Created ASC",
    },
  ];
  return (
    <div className="fixed bottom-[6rem] rounded-lg flex flex-col bg-header-gray p-4">
      {sortOptions.map((ele) => (
        <div key={ele.value}>
          <label htmlFor={ele.value}>{ele.labelContent}</label>
          <input
            id={ele.value}
            type="radio"
            name="group"
            value={ele.value}
            onChange={(e) => setSortOption(e.target.value)}
            checked={sortOption == ele.value}
          />
        </div>
      ))}
      <button
        onClick={() => {
          setFilterOption((old) => {
            return {
              ...old,
              sortOption: sortOption,
            };
          });
          setShowSort(false);
        }}
      >
        Apply Sort
      </button>
    </div>
  );
}
