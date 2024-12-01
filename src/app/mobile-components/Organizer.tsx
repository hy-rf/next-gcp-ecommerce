"use client";
import Image from "next/image";
import ProductFilter from "../[locale]/_component/ProductFilter";
import ProductSort from "../[locale]/_component/ProductSort";
import { Dispatch, SetStateAction, useState } from "react";
type FilterOptions = {
  page: number;
  storeId: string;
  categoryId: string;
  subCategoryId: string;
  minPrice: number;
  maxPrice: number;
};
// general buttons for generating of sort and filter popup
export default function Organizer({
  filterOption,
  changeFilterOption,
}: {
  filterOption: FilterOptions;
  changeFilterOption: Dispatch<SetStateAction<FilterOptions>>;
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
      {showFilter && <ProductFilter categories={[]} subcategories={[]} />}
      {showSort && <ProductSort />}
    </>
  );
}
