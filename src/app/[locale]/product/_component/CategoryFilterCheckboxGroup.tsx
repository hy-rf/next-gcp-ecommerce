"use client";

import { Category } from "@/model";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function CategoryFilterCheckboxGroup({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const categories: Category[] = await fetch("/api/category/").then((res) =>
        res.json()
      );
      setCategories(categories);
    })();
  }, []);
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
      {categories.map((option) => (
        <div key={option.id}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value={option.id}
              checked={selectedCategories.includes(option.id!)}
              onChange={() => handleCheckboxChange(option.id!)}
            />
            <p className="leading-loose">{option.name}</p>
          </label>
        </div>
      ))}
    </div>
  );
}
