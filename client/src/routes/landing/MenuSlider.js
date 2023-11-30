import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import MenuSliderCategory from './MenuSliderCategory';
import MenuSliderProduct from './MenuSliderProduct';

function MenuSlider(props) {
  const [state, setState] = useState({
    currentCategory: -1,
    thumbnail: {
      src1440: "",
      src900: "",
      src700: "",
      src375: ""
    },
    products: [],
    categories: []
  })

  const changeCategory = category => {
    setState({
      ...state,
      currentCategory: category
    });
  }

  const getProductsByCategoryId = id => {
    try {
      return state.products.filter(product => product.category === id)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => setState({
    thumbnail: props.thumbnail,
    products: props.products,
    categories: props.categories,
    currentCategory: props.categories.length > 0 ? props.categories[0].id : -1
  }), [props.thumbnail, props.products, props.categories])

  return (
    <article className='section-8'>
      <motion.div
        className='section-8'
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 2 }}>
        <img className='menu-slider-hero'
          src={state.thumbnail.src375}
          srcSet={`${state.thumbnail.src1440} 1440w, ${state.thumbnail.src900} 900w,
                  ${state.thumbnail.src700} 700w, ${state.thumbnail.src375} 375w`}
          sizes='(min-width: 1440px) 1440px, (min-width: 900px) 900px, 
                (min-width: 700px) 700px, 375px'
          alt='menu slider' />
        <section className='dish-slider flex-container flex-column txt-center'>
          <section className='dish-categories flex-container flex-column'>
            <ul>
              {state.categories.map(category => {
                return (
                  <MenuSliderCategory
                    key={category.id}
                    category={category}
                    changeCategory={changeCategory}
                  />
                )
              })}
            </ul>
          </section>
          <section className='menu-slider-products'>
            <ul>
              {getProductsByCategoryId(state.currentCategory).map(product => {
                return (
                  <MenuSliderProduct
                    key={product.id}
                    product={product}
                  />
                )
              })}
            </ul>
          </section>
        </section>
      </motion.div>
    </article>
  )
}

export default MenuSlider