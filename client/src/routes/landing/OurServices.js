import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

function OurServices(props) {
  return (
    <motion.article
      className="section-3-container"
      initial={{ opacity: 0, translateY: -300 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}>
      <h2 className="pop-font">Our Services</h2>
      <p className="pop-font section-description">
        Foodie provides services across all states - various foods and
        drinks, you choose! What makes us special is our teams of
        professionals with extensive knowledge of all cuisine that we have to
        offer.
      </p>
      <section className="services-grid flex-container flex-column">
        {props.service.map((service) =>(
          <Tilt key={service.id}>
            <section className="service-list flex-container flex-column">
              <img width="50" height="50" className="service-img" src={service.img} alt="" aria-hidden="true" />
              <section>
                <h3 className="pop-font">{service.name}</h3>
                <p>{service.description}</p>
              </section>
            </section>
          </Tilt>
        ))}
      </section>
    </motion.article>
  )
}

export default OurServices;