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
    <>
      {sortOptions.map((ele) => (
        <div key={ele.value} className="flex gap-2 w-32">
          <input
            id={ele.value}
            type="radio"
            name="group"
            value={ele.value}
            onChange={(e) => setSortOption(e.target.value)}
            checked={sortOption == ele.value}
            className="h-9"
          />
          <label className="flex justify-between w-full" htmlFor={ele.value}>
            <p className="leading-loose">{ele.labelContent.split(" ")[0]}</p>
            <p className="leading-loose">{ele.labelContent.split(" ")[1]}</p>
          </label>
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
        className="bg-gray-400 rounded-md"
      >
        Apply Sort
      </button>
    </>
  );
}
