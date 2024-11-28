"use client";

import { ReactNode } from "react";

type WindowOptions = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export default function PopupWindow({
  children,
  options,
}: {
  children: ReactNode;
  options: WindowOptions;
}) {
  return (
    <div
      className={`fixed left-[${options.x}px] top-[${options.y}px] w-[${options.width}px] h-[${options.height}px]`}
    >
      {children}
    </div>
  );
}
