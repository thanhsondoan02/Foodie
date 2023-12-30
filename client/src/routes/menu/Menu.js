import React from "react";
import ScrollButton from "../../helpers/ScrollButton";
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { motion } from "framer-motion";
import Category from "./Category";
import GridItem from "./GridItem";
import { apiGetCategories, apiGetProducts, apiSearchProducts } from "../../services/MenuService";
import { debounce } from 'lodash';

function Menu() {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(["All"]);
  const [searchKey, setSearchKey] = useState("");

  const onPageChange = (event) => {
    if (searchKey === "") {
      getProductsFromServer(event.selected + 1, currentCategory);
    } else {
      searchProductsFromServer(searchKey, event.selected + 1);
    }
    ResetLocation();
  };

  const onCategoryChange = (newCategory) => {
    setSearchKey("")
    document.querySelector(".menu-search").value = "";
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

  const searchProductsFromServer = async (searchString, page) => {
    setCurrentPage(page)
    setSearchKey(searchString)
    try {
      const response = await apiSearchProducts(searchString, page);
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

  // after user stop typing for 1 second => search
  const onSearch = debounce((value) => {
    if (value === "") return
    setCurrentCategory("All")
    setCurrentProducts([])
    setTotalPages(1)
    searchProductsFromServer(value, 1)
  }, 1000);

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
          onSearch={onSearch}
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