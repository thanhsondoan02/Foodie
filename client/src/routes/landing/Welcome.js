import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

function Welcome(props) {
  const [state, setState] = useState({
    headerLeft: "",
    headerRight: "",
    spanCenter: ""
  })

  const getHeaderLeft = (header, spanInHeader) => {
    if (!header) return ""
    if (!spanInHeader) return header
    return header.slice(0, spanInHeader.start)
  }

  const getHeaderRight = (header, spanInHeader) => {
    if (!header) return ""
    if (!spanInHeader) return ""
    return header.slice(spanInHeader.end)
  }

  const getSpan = (header, spanInHeader) => {
    if (!header) return ""
    if (!spanInHeader) return ""
    return header.slice(spanInHeader.start, spanInHeader.end)
  }

  useEffect(() => {
    setState({
      headerLeft: getHeaderLeft(props.header, props.spanInHeader),
      headerRight: getHeaderRight(props.header, props.spanInHeader),
      spanCenter: getSpan(props.header, props.spanInHeader)
    })
  }, [props.header, props.spanInHeader])

  return (
    <article className="welcome-section">
      <section className="section-2-info flex-container flex-column txt-center pop-font">
        <motion.img
          src={props.pizzaTwo} alt="Welcome Section Pizza Two" className="pizza-two"
          initial={{ opacity: 0, translateX: -200 }}
          whileInView={{ opacity: 1, translateX: -10 }}
          transition={{ duration: 2 }} />
        <motion.img
          src={props.pizzaOne} alt="Welcome Section Pizza One" className="pizza-one"
          initial={{ opacity: 0, translateX: 200 }}
          whileInView={{ opacity: 1, translateX: 10 }}
          transition={{ duration: 2 }} />
        <h2 className="txt-white">
          {state.headerLeft}<span>{state.spanCenter}</span>{state.headerRight}
        </h2>
        <p>
          {props.description}
        </p>
      </section>
      <LazyLoadImage
        className="section-two-img"
        src={props.thumbnail.img375}
        srcSet={`${props.thumbnail.img1440} 1440w,
         ${props.thumbnail.img700} 700w, ${props.thumbnail.img375} 375w`}
        sizes="(min-width: 1440px) 1440px, (min-width: 700px) 700px, 375px"
        alt="Foodie restaurant interior with people at the table and the staff serving the customers"
      />
    </article>
  )
}

export default Welcome;