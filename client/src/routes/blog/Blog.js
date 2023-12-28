import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import allBlogPosts from "../../data/allBlogPosts";
import ScrollBtn from "../../helpers/ScrollButton";
import ResetLocation from "../../helpers/ResetLocation";
import BlogPosts from "./BlogPosts";

const Blog = () => {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);
  const [currentBlogPosts, setCurrentBlogPosts] = useState([]);

  const pageCount = Math.ceil(allBlogPosts.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    ResetLocation();
  };

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentBlogPosts(allBlogPosts.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <motion.main
      className="blog"
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
    >
      <h2 style={{ marginLeft: '5%', marginRight: '5%', color: 'var(--white)', fontSize: '4rem', marginTop: '30px', marginBottom: '30px' }}>Blog</h2>
      <p className="blog-intro" style={{ marginLeft: '5%', marginRight: '5%', color: 'var(--whitish-gray)', fontSize: '1.3rem', width: '100%', maxWidth: '1200px', marginTop: '15px', paddingBottom: '3rem', marginBottom: '30px' }}>
        Pizza makes everything better. These are some of our favorite pizza
        blogs that are loaded with recipes and pizza-making tips.
      </p>
      <section className="blog-grid" style={{ marginLeft: '5%', marginRight: '5%', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', width: '100%', margin: '0 auto', maxWidth: '1440px', marginBottom: '30px' }}>
        {currentBlogPosts.map((blogPost, index) => {
          return <BlogPosts key={index} blogPost={blogPost} />;
        })}
      </section>
      <ReactPaginate
        className="pagination blog-pagination"
        breakLabel="..."
        nextLabel=" &#62;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="&#60;"
        renderOnZeroPageCount={null}
        style={{ marginLeft: '5%', marginRight: '5%', position: 'initial', display: 'flex', flexDirection: 'row', marginTop: '4rem', marginBottom: '3rem' }}
      />
      <ScrollBtn />
    </motion.main>
  );
}

export default Blog;
