"use client";
// TODO: will include filter and sort here
import Image from "next/image";
import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShowFilter(true);
      setShowSort(true);
    }
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setShowFilter(true);
        setShowSort(true);
      } else {
        setShowFilter(false);
        setShowSort(false);
      }
    });
  }, []);

  return (
    <>
      <div className="fixed bottom-10 w-40 right-6 md:hidden">
        <div
          className={`justify-center flex m-auto p-0 rounded-[32px] shadow-category-card`}
          style={{ backdropFilter: "blur(1px)" }}
        >
          <div
            className={`${!showSort ? "bg-[rgba(128,128,128,0.6)]" : "bg-header-gray"} rounded-tl-[32px] rounded-bl-[32px] p-2 transform duration-300 select-none`}
            onClick={() => setShowSort(!showSort)}
          >
            <Image src={"/sort.svg"} width={40} height={40} alt="sort"></Image>
          </div>
          <div className="py-2 px-2 bg-[rgba(128,128,128,0.6)] select-none">
            <Image
              src={"/align.svg"}
              width={40}
              height={40}
              alt="align"
            ></Image>
          </div>
          <div
            className={`${!showFilter ? "bg-[rgba(128,128,128,0.6)]" : "bg-header-gray"} rounded-tr-[32px] rounded-br-[32px] p-2  transform duration-300 select-none`}
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
      <div
        id="desktop-filter"
        className="md:flex-col-reverse md:flex md:justify-end gap-4 md:sticky md:left-0 md:top-0 md:w-40"
      >
        {showFilter && (
          <div className="fixed bottom-28 rounded-lg flex flex-col right-6 p-4 shadow-md items-center md:flex md:static bg-header-gray md:bg-filter-and-sort-bg-color">
            <ProductFilter
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              setShowFilter={setShowFilter}
            />
          </div>
        )}
        {showSort && (
          <div className="fixed bottom-28 rounded-lg flex flex-col p-4 left-6 shadow-md md:static md:flex bg-header-gray md:bg-filter-and-sort-bg-color">
            <ProductSort
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              setShowSort={setShowSort}
            />
          </div>
        )}
      </div>
    </>
  );
}
