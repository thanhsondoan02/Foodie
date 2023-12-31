import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import ScrollButton from "../../helpers/ScrollButton";
import ResetLocation from "../../helpers/ResetLocation";
import BlogPosts from "./BlogPosts";
import { apiGetBlogList } from "../../services/BlogService";
import { toastError } from "../../helpers/toastHelper";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const onPageChange = (event) => {
    ResetLocation();
    let newPage = event.selected + 1;
    getPostsFromServer(newPage);
  };

  const getPostsFromServer = async (page) => {
    setCurrentPage(page);
    setPosts([]);
    setTotalPages(0);
    try {
      const response = await apiGetBlogList(page);
      if (response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages)
        setPosts(response.data.DT.blogs)
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err.message);
    }
  }

  useEffect(() => {
    document.title = "Blog | Foodie";
    getPostsFromServer(1);
  }, []);

  return (
    <motion.main
      className="blog"
      whileInView={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, translateX: -300 }}
      initial={{ opacity: 0, translateX: -300 }}
    >
      <h2>Blog</h2>
      <p className="blog-intro">
        Read some of your favorite pizza
        blogs that are loaded with recipes and pizza-making tips.
      </p>
      <section className="blog-grid">
        {posts.map((blogPost, index) => {
          return <BlogPosts key={index} blogPost={blogPost} />;
        })}
      </section>
      <ReactPaginate
        className="pagination blog-pagination"
        breakLabel="..."
        nextLabel=" &#62;"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
      />
      <ScrollButton />
    </motion.main>
  );
}
export default Blog;