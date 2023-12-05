import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ResetLocation from '../../helpers/ResetLocation';
import axios from 'axios';

function Blog() {
  const baseUrl = "https://2e577fbb-d06d-412f-b4ea-3ef3d13a77e5.mock.pstmn.io"

  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    posts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { title, description, posts } = blogData;

  return (
    <motion.div
      className="section-9 flex-container flex-column"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <h2 className="txt-center pop-font txt-white">{title}</h2>
      <p className="section-description">{description}</p>
      <section className="blog-posts-landing">
        {posts.map((post) => (
          <section key={post.id} className="post flex-container flex-column">
            <img src={post.img} alt={post.name} />
            <p className="date">{post.date}</p>
            <Link
              onClick={ResetLocation}
              to={`/blog/${post.name.toLowerCase().replaceAll(' ', '-')}`}
            >
              <h3 className="pop-font txt-white">{post.name}</h3>
            </Link>
            <p className="intro">{post.intro}</p>
          </section>
        ))}
      </section>

      <Link
        onClick={ResetLocation}
        to="/blog"
        className="active-button-style txt-white"
      >
        More posts
      </Link>
    </motion.div>
  );
}

export default Blog;
