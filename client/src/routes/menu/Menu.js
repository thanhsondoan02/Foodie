import React from "react";
import ScrollButton from "../../helpers/ScrollButton";
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { motion } from "framer-motion";
import Category from "./Category";
import GridItem from "./GridItem";
import axios from "axios";

function Menu() {
  const categories = [
    {
      name: "Menu",
      id: 0,
    },
    {
      name: "Pizza",
      id: 1,
    },
    {
      name: "Pasta",
      id: 2,
    },
    {
      name: "Sushi",
      id: 3,
    },
    {
      name: "Drinks",
      id: 4,
    },
    {
      name: "Sale",
      id: 5,
    },
  ]
  const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"
  const limit = 5;

  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (event) => {
    getProductsFromServer(event.selected + 1, currentCategory);
    ResetLocation();
  };

  const resetPagination = () => {
  }

  const onCategoryChange = (newCategoryId) => {
    getProductsFromServer(1, newCategoryId);
  };

  const getCategoryName = (id) => {
    const category = categories.find(category => category.id === id);
    return category.name;
  }

  const getProductsFromServer = (page, category) => {
    setCurrentPage(page);
    setCurrentCategory(category);
    axios.get(`${baseUrl}/api/v1/food/getAll?page=${page}&limit=${limit}`)
      .then(res => {
        setTotalPages(res.data.DT.totalPages)
        setCurrentProducts(res.data.DT.foods)
      })
      .catch(err => { console.log(err) })
  }

  useEffect(() => {
    document.title = `${getCategoryName(currentCategory)} | Pizza Time`;
    getProductsFromServer(currentPage, currentCategory);
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
          resetPagination={resetPagination}
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
          forcePage={currentPage-1}
        />
      </motion.main>
  );
}


export default Menu;