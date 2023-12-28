import React from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/images/search-icon.png";
import ResetLocation from "../../helpers/ResetLocation";
import { color } from "framer-motion";

function Category({ currentCategory, allCategories, changeCategory, resetPagination }) {
  return (
    <article className="side-menu">
      <section className="menu-search-section">
        <input
          type="text"
          className="menu-search"
          placeholder="search..."
          // onChange={findMenuItem}
        />
        <img src={SearchIcon} alt="" aria-hidden="true" className="menu-search-icon" />
      </section>
      <ul>
        {allCategories.map((category) => (
          <li key={category.id}>
            <NavLink
              to="/menu"
              onClick={() => {
                changeCategory(category.id);
                ResetLocation();
                resetPagination();
              }}
              style={{color: currentCategory === category.id ? "#F8B703" : "#fff"}}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </article>
  );
}
export default Category;
