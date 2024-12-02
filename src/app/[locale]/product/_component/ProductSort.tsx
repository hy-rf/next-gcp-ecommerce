"use client";

//import { useState } from "react";

export default function ProductSort() {
  //const [sortOption, setSortOption] = useState(null);
  return (
    <div className="fixed w-full rounded-tl-4 rounded-tr-4">
      {/* Filter options */}
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="category">Category</label>
        <select name="" id="category">
          <option value="">Choose Category</option>
          <option value="OhFPcQGt5B8iJ6TywjgS">Learning</option>
          <option value="ujoJM3sLWQLd2G4QGYxu">Books</option>
        </select>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="sub-category">SubCategory</label>
        <select name="" id="sub-category">
          <option value="">Choose Sub Category</option>
          <option value="8NTCSFSyKE1fXldHCDiu">Sketching</option>
          <option value="nTvLmo7vdZYMx6NMWTsk">Health</option>
          <option value="ooxykUV2QxMoQ39PYwiD">Language</option>
        </select>
      </div>
    </div>
  );
}
