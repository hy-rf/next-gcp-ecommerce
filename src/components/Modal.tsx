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
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-500 ${
        show ? "bg-black/50 opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out scale-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Are you sure you want to proceed?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setShow(false);
              setTimeout(() => action2(), 600); // Close animation
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={() => action()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
