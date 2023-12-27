import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import motion from framer-motion
import ResetLocation from '../../helpers/ResetLocation';
import axios from 'axios';

function Blog() {
  const baseUrl = 'https://bc36cc0f-d221-4d0b-bc41-dbebf2e5716f.mock.pstmn.io/getBlog';

  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    posts: [],
  });

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Ensure that blogData.posts is an array before mapping over it
  const posts = blogData.posts || [];

  return (
    <motion.div  // Use motion.div for animations
      className="section-9 flex-container flex-column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <h2 className="txt-center pop-font txt-white">{blogData.title}</h2>
      <p className="section-description">{blogData.description}</p>
      <section className="blog-posts-landing">
        {posts.map((post) => (
          <motion.section  // Use motion.section for individual post animations
            key={post.id}
            className="post flex-container flex-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={post.img} alt={post.name} />
            <p className="date">{post.date}</p>
            <Link
              onClick={ResetLocation}
              to={`/blog/${post.name.toLowerCase().replaceAll(' ', '-')}`}
            >
              <h3 className="pop-font txt-white">{post.name}</h3>
            </Link>
            <p className="intro">{post.intro}</p>
          </motion.section>
        ))}
      </section>

      <Link onClick={ResetLocation} to="/blog" className="active-button-style txt-white">
        More posts
      </Link>
    </motion.div>
  );
}

export default Blog;
