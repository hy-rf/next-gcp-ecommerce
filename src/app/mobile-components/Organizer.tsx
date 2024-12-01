"use client";
import Image from "next/image";
// general buttons for generating of sort and filter popup
export default function Organizer() {
  return (
    <div className="fixed bottom-8 w-full left-0 md:hidden">
      <div className="justify-center bg-gray-500 flex w-[8rem] m-auto p-3 rounded-[32px]">
        <div>
          <Image src={"/sort.svg"} width={40} height={40} alt="sort"></Image>
        </div>
        <div>
          <Image src={"/align.svg"} width={40} height={40} alt="align"></Image>
        </div>
        <div>
          <Image
            src={"/filter.svg"}
            width={40}
            height={40}
            alt="filter"
          ></Image>
        </div>
      </div>
    </div>
  );
}
