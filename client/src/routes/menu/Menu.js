import React from "react";
import ScrollButton from "../../helpers/ScrollButton";
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { motion } from "framer-motion";
import Category from "./Category";
import GridItem from "./GridItem";
import { apiGetCategories, apiGetProducts } from "../../services/MenuService";

function Menu() {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(["All"]);

  const onPageChange = (event) => {
    getProductsFromServer(event.selected + 1, currentCategory);
    ResetLocation();
  };

  const onCategoryChange = (newCategory) => {
    getProductsFromServer(1, newCategory);
  };

  const getProductsFromServer = async (page, category) => {
    setCurrentPage(page);
    setCurrentCategory(category);
    try {
      const response = await apiGetProducts(page, category);
      if (response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages)
        setCurrentProducts(response.data.DT.foods)
      } else {
        console.log(response.data.EM);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getCategoriesFromServer = async () => {
    if (categories.length > 1) return;
    try {
      const response = await apiGetCategories();
      if (response.data.EC === 0) {
        let addCategories = response.data.DT.map((category, _) => category.Category)
        setCategories(categories.concat(addCategories))
      } else {
        console.log(response.data.EM);
        return;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    document.title = `Menu of ${currentCategory} | Pizza Time`;
    getCategoriesFromServer();
    getProductsFromServer(currentPage, currentCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    totalPages === 0 ? <p>Loading...</p>
      : <motion.main
        className="menu-main"
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 1 }}
      >
        <Category
          currentCategory={currentCategory}
          allCategories={categories}
          changeCategory={onCategoryChange}
        />

        <article className="menu-grid">
          {currentProducts.map((singleProduct) => (
            <GridItem
              key={singleProduct.id}
              singleProduct={singleProduct}
            />
          ))}
          <ScrollButton />
        </article>

        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=" &#62;"
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="&#60;"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </motion.main>
  );
}


export default Menu;