"use client";

import { useEffect, useState } from "react";

export default function Modal({
  action,
  action2,
}: {
  action: () => void;
  action2: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999] transform ease-in-out duration-500 ${show ? "bg-[#000000aa] opacity-100" : "bg-[#ffffff] opacity-0"}`}
    >
      <button onClick={() => action()} className="w-20 h-20 bg-white">
        Yes
      </button>
      <button
        onClick={() => {
          setShow(false);
          setTimeout(() => action2(), 600);
        }}
        className="w-20 h-20 bg-white"
      >
        No
      </button>
    </div>
  );
}
