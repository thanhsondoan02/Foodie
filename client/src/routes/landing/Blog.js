import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import resetLocation from '../../helpers/ResetLocation'

function Blog(props) {
  return (
    <motion.div className="section-9 flex-container flex-column"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <h2 className="txt-center pop-font txt-white">{props.title}</h2>
      <p className="section-description">{props.description}</p>
      <section className="blog-posts-landing">
        {props.posts.map((post) => (
          <section
            key={post.id}
            className="post flex-container flex-column"
          >
            <img src={post.img} alt={post.name} />
            <p className="date">{post.date}</p>
            <Link onClick={resetLocation} to={`/blog/${post.name.toLowerCase().replaceAll(' ', '-')}`}>
              <h3 className="pop-font txt-white">{post.name}</h3>
            </Link>
            <p className="intro">{post.intro}</p>
          </section>
        ))}
      </section>

      <Link
        onClick={resetLocation}
        to="/blog"
        className="active-button-style txt-white"
      >
        More posts
      </Link>
    </motion.div>
  )
}

export default Blog