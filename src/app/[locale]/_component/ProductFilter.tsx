"use client";

import { useState } from "react";

interface ProductFilterProps {
  priceRange?: [number, number];
  categories: string[];
  subcategories: string[];
  keyword?: string;
}

export default function ProductFilter({
  priceRange = [0, 200],
  categories,
  subcategories,
  keyword = "",
}: ProductFilterProps) {
  const [price, setPrice] = useState<[number, number]>(priceRange);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword);

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleApplyFilters = () => {
    if (true) {
      // change state of organizer
      return;
    } else {
      document.location.replace("new link with filter params");
      return;
    }
  };

  return (
    <div className="fixed bottom-[6rem] bg-gray-900 w-full text-white p-4 rounded-lg shadow-md">
      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Price range</h3>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            value={price[0]}
            min={0}
            className="w-16 p-2 text-black rounded"
            onChange={(e) =>
              setPrice([Math.min(Number(e.target.value), price[1]), price[1]])
            }
          />
          <span>-</span>
          <input
            type="number"
            value={price[1]}
            max={200}
            className="w-16 p-2 text-black rounded"
            onChange={(e) =>
              setPrice([price[0], Math.max(Number(e.target.value), price[0])])
            }
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Category</h3>
        <select
          className="w-full p-2 mt-2 text-black rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Subcategories</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {subcategories.map((subcategory) => (
            <label
              key={subcategory}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded"
            >
              <input
                type="checkbox"
                checked={selectedSubcategories.includes(subcategory)}
                onChange={() => handleSubcategoryToggle(subcategory)}
              />
              {subcategory}
            </label>
          ))}
        </div>
      </div>

      {/* Keyword Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-bold">Search Keyword</h3>
        <input
          type="text"
          placeholder="Enter keyword"
          value={searchKeyword}
          className="w-full p-2 mt-2 text-black rounded"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full py-3 mt-4 bg-gray-700 hover:bg-gray-600 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
