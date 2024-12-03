"use client";
// TODO: will include filter and sort here
import Image from "next/image";
import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";
import { Dispatch, SetStateAction, useState } from "react";
import { FilterOptions } from "@/model";

// general buttons for generating of sort and filter popup
export default function Organizer({
  filterOption,
  setFilterOption,
}: {
  filterOption: FilterOptions;
  setFilterOption: Dispatch<SetStateAction<FilterOptions>>;
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <>
      <div className="fixed bottom-10 w-auto right-6">
        <div
          className={`justify-center flex m-auto p-0 rounded-[32px] shadow-category-card`}
        >
          <div
            className={`${showSort ? "toggle-organizer-gray" : " bg-header-gray"} rounded-tl-[32px] rounded-bl-[32px] p-2 transform duration-300 select-none`}
            onClick={() => setShowSort(!showSort)}
          >
            <Image src={"/sort.svg"} width={40} height={40} alt="sort"></Image>
          </div>
          <div className="py-2 px-2 bg-header-gray select-none">
            <Image
              src={"/align.svg"}
              width={40}
              height={40}
              alt="align"
            ></Image>
          </div>
          <div
            className={`${showFilter ? "toggle-organizer-gray" : " bg-header-gray"} rounded-tr-[32px] rounded-br-[32px] p-2  transform duration-300 select-none`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <Image
              src={"/filter.svg"}
              width={40}
              height={40}
              alt="filter"
            ></Image>
          </div>
        </div>
      </div>
      {showFilter && (
        <ProductFilter
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          setShowFilter={setShowFilter}
        />
      )}
      {showSort && (
        <ProductSort
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          setShowSort={setShowSort}
        />
      )}
    </>
  );
}
