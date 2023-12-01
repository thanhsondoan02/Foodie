import React from "react";
import { motion } from "framer-motion";

function MenuSliderProduct(props) {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}
      className="slider-product">
      <img src={props.product.img375}
        srcSet={` ${props.product.img700} 700w, ${props.product.img375} 375w`}
        sizes="(min-width: 700px) 700px, 375px"
        alt={props.product.name} />
      
      <section className="slider-product-description">
        <h3 className="pop-front txt-white">{props.product.name}</h3>
        <p className="dish-details-desc pop-front">{props.product.description}</p>
        <p className="dish-details-pricing"><span>$</span>{props.product.price}</p>
      </section>
    </motion.div>
  )
}

export default MenuSliderProduct