import React from "react";
import "./SearchBar.css"

export default function SearchBar() {
  return (
    <div className="search-bar">
      <span className="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <textarea rows="1" className="search-bar-input" placeholder="Search">
      </textarea>
    </div>
  )
};