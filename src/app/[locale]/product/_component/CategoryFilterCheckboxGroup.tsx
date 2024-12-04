"use client";

import { Dispatch, SetStateAction } from "react";

export default function CategoryFilterCheckboxGroup({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) {
  const options = [
    { value: "OhFPcQGt5B8iJ6TywjgS", label: "Learning" },
    { value: "ujoJM3sLWQLd2G4QGYxu", label: "Books" },
    { value: "PR5oSDeaJP2VD1XlIu6I", label: "Electronics" },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(value)
          ? prev.filter((val) => val !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <div key={option.value}>
          <label className="flex justify-between items-center gap-2">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedCategories.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <p className="leading-loose">{option.label}</p>
          </label>
        </div>
      ))}
    </div>
  );
}
