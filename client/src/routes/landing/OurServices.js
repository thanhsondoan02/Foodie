import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import ImgOne from "../../assets/images/our-services/organic-food.webp";
import ImgTwo from "../../assets/images/our-services/express-delivery.webp";
import ImgThree from "../../assets/images/our-services/unforgable-taste.webp";

const OurServices = () => {
  const [state, setState] = useState({
    ourServices: [
      {
        id: 1,
        img: ImgOne,
        name: 'Organic Food',
        description:
          'Pure and healthy organic food is our lifestyle. The products we consume has impact on out future and we do everything to keep the future healthy',
      },
      {
        id: 2,
        img: ImgTwo,
        name: 'Express Delivery',
        description:
          'Choose from a variety of express delivery services depending on your needs. Whether in a hurry to eat or have some plans tomorrow, we have got you covered',
      },
      {
        id: 3,
        img: ImgThree,
        name: 'Unforgetable Taste',
        description:
          'Our goal is to provide our customers with excellent service, great taste and unforgettable experiences. This will be a mind-blowing experience for your taste buds',
      },
    ]
  })
  return (
    <motion.article
      className="section-3-container"
      initial={{ opacity: 0, translateY: -300 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}>
      <h2 className="pop-font">Our Services</h2>
      <p className="pop-font section-description">
        Pizza Time provides services across all states - various foods and
        drinks, you choose! What makes us special is our teams of
        professionals with extensive knowledge of all cuisine that we have to
        offer.
      </p>
      <section className="services-grid flex-container flex-column">
        {state.ourServices.map((service) =>(
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