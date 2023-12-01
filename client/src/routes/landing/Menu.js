import React from 'react'
import { Link } from 'react-router-dom'
import ResetLocation from '../../helpers/ResetLocation'
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

function Menu(props) {
    return (
      <motion.article
        className="section-5 flex-container "
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 2 }}
      >
        <h2 className="txt-center pop-font txt-white">Menu Pricing</h2>
        <p className="section-description">
          Every bite of every meal is different and special. You will never get
          bored and you will always be able to find something new and
          interesting for you. Discover every mouthwatering option we have to
          offer
        </p>
        <section className="pricing-grid flex-container flex-column">
          {props.menu.map((item) => (
            <Tilt key={item.id}>
              <Link
                onClick={ResetLocation}
                to="/menu"
                className="pricing-grid-item flex-container flex-row"
              >
                <img
                  className="pricing-img"
                  alt={item.name}
                  src={item.img375}
                />
                <section className="pricing-details flex-container flex-column">
                  <section className="name-and-price flex-container flex-row txt-center">
                    <h3 className="pop-font">{item.name}</h3>
                    <p>
                      <span>{item.currency}</span>
                      {item.price}
                    </p>
                  </section>
                  <p>{item.description}</p>
                </section>
              </Link>
            </Tilt>
          ))}
        </section>
      </motion.article>
    )
}

export default Menu