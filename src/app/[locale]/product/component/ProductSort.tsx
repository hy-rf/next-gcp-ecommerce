"use client";

import { FilterOptions } from "@/model";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import LocaleContext from "../../component/LocaleContext";

export default function ProductSort({
  filterOption,
  setFilterOption,
  setShowSort,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
  setShowSort: Dispatch<SetStateAction<boolean>>;
}) {
  const { dict } = useContext(LocaleContext);
  const [sortOption, setSortOption] = useState<string>(
    filterOption.sortOption || "sold-desc"
  );
  const sortOptions = [
    {
      value: "sold-desc",
      labelContent: `${dict.product_sort_sold} ${dict.product_sort_desc}`,
    },
    {
      value: "sold-asc",
      labelContent: `${dict.product_sort_sold} ${dict.product_sort_asc}`,
    },
    {
      value: "price-desc",
      labelContent: `${dict.product_sort_price} ${dict.product_sort_desc}`,
    },
    {
      value: "price-asc",
      labelContent: `${dict.product_sort_price} ${dict.product_sort_asc}`,
    },
    {
      value: "created-desc",
      labelContent: `${dict.product_sort_created} ${dict.product_sort_desc}`,
    },
    {
      value: "created-asc",
      labelContent: `${dict.product_sort_created} ${dict.product_sort_asc}`,
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
        {dict.product_sort_apply}
      </button>
    </>
  );
}
