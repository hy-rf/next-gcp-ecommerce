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
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedCategories.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
