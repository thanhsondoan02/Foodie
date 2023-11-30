import React from 'react'
import { motion } from "framer-motion";

function Contact(props) {
  const motionImgClassList = [
    "parallax company-details-image",
    "parallax company-details-image-two",
    "parallax company-details-image-three"]

  return (
    <section className="contact-us-landing flex-container flex-row txt-white" >
      {[1, 2, 3].map((_, index) => (
        <motion.img
          key={index}
          initial={{ opacity: 0, translateX: 1000 }}
          whileInView={{ opacity: 0.8, translateX: 400 + index * 200, }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          src={props.img}
          alt=""
          aria-hidden="true"
          className={motionImgClassList[index]}
        />
      ))}
      <section className='company-details'>
        {props.lines
          .filter((_, index) => index % 2 === 0)
          .map((_, index) => (
            <div key={index}>
              <h2>{props.lines[index * 2]}</h2>
              <p>{props.lines[index * 2 + 1]}</p>
            </div>
          ))}
      </section>
    </section>
  );
}

export default Contact;