"use client";
import Image from "next/image";
export default function ZoomImage({
  index,
  ele,
}: {
  index: number;
  ele: string;
}) {
  return (
    <div className="relative">
      <Image
        src={ele}
        alt={`Product Image ${index + 1}`}
        width={200}
        height={200}
        className="w-full h-full object-cover rounded-md shadow-md"
      />
    </div>
  );
}
