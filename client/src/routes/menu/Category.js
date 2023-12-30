import React from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/search-icon.png";
import resetLocation from "../../helpers/ResetLocation";

function Category({ currentCategory, allCategories, changeCategory, onSearch, searchKey, setSearchKey }) {
  return (
    <article className="side-menu">
      <section className="menu-search-section">
        <input
          type="text"
          className="menu-search"
          placeholder="Enter your search..."
          onChange={(e) => {
            onSearch(e.target.value)
          }}
        />
        <img src={SearchIcon} alt="" aria-hidden="true" className="menu-search-icon" />
      </section>
      <ul>
        {allCategories.map((category, index) => (
          <li key={index}>
            <NavLink
              to="/menu"
              onClick={() => {
                changeCategory(category);
                resetLocation();
              }}
              style={{ color: currentCategory === category ? "#F8B703" : "#fff" }}
            >
              {category}
            </NavLink>
          </li>
        ))}
      </ul>
    </article>
  );
}
export default Category;
