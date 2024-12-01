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
      <div className="fixed bottom-8 w-full left-0 md:hidden">
        <div className="justify-center bg-gray-500 flex w-[8rem] m-auto p-3 rounded-[32px]">
          <div onClick={() => setShowSort(!showSort)}>
            <Image src={"/sort.svg"} width={40} height={40} alt="sort"></Image>
          </div>
          <div>
            <Image
              src={"/align.svg"}
              width={40}
              height={40}
              alt="align"
            ></Image>
          </div>
          <div onClick={() => setShowFilter(!showFilter)}>
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
        />
      )}
      {showSort && <ProductSort />}
    </>
  );
}
