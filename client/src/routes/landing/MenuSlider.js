import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import MenuSlide375 from '../../assets/images/section-eight/section-eight-375.webp'
import MenuSlide700 from '../../assets/images/section-eight/section-eight-700.webp'
import MenuSlide900 from '../../assets/images/section-eight/section-eight-900.webp'
import MenuSlide1440 from '../../assets/images/section-eight/section-eight-1440.webp'
import MenuSliderCategory from './MenuSliderCategory';
import MenuSliderProduct from './MenuSliderProduct';
import axios from 'axios';

function MenuSlider() {
  const baseUrl = "https://29201796-3b03-452f-abee-635c05c2d9cb.mock.pstmn.io"

  const [state, setState] = useState({
    currentCategory: -1,
    products: [],
    categories: []
  })

  const changeCategory = category => {
    setState({
      currentCategory: category,
      products: state.products,
      categories: state.categories
    });
  }

  const getProductsByCategoryId = id => {
    try {
      console.log(state.products.filter(product => product.category === id))
      return state.products.filter(product => product.category === id)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => {
    axios.get(baseUrl + "/menu-slider")
      .then(res => {
        setState({
          products: res.data.products,
          categories: res.data.categories,
          currentCategory: res.data.categories[0].id
        })
      })
  }, [])

  return (
    <article className='section-8'>
      <motion.div
        className='section-8'
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 2 }}>
        <img className='menu-slider-hero'
          src={MenuSlide375}
          srcSet={`${MenuSlide700} 700w, ${MenuSlide900} 900w, ${MenuSlide1440} 1440w, ${MenuSlide375} 375w`}
          sizes='(min-width: 1440px) 1440px, (min-width: 900px) 900px, (min-width: 700px) 700px, 375px'
          alt='Menu Slider Hero' />
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