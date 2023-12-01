import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import "react-alice-carousel/lib/alice-carousel.css";

function AdVideo(props) {
  const videoRef = useRef()

  useEffect(() => { videoRef.current.load() }, [props.vid])

  return (
    <section className='hero-section'>
      <video autoPlay loop muted playsInline ref={videoRef} className='hero-video'>
        <source src={props.vid} type='video/mp4' />
      </video>
      <section className='header-info flex-container flex-column txt-center pop-font txt-white'>
        <motion.div
          initial={{ opacity: 0, translateX: 300 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <span>{props.span}</span>
          <h1 className='txt-white'>{props.header}</h1>
          <p className='txt-white'>{props.description}</p>
        </motion.div>
        <div className='header-btns flex-container flex-row'>
          <Link className='passive-button-style' to='/blog'>
            Read Blog
          </Link>
          <Link className='passive-button-style' to='/menu'>
            View Menu
          </Link>
        </div>
      </section>
    </section>
  )
}

export default AdVideo;