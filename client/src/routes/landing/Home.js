import React, { useEffect, useState } from "react"
import ResetLocation from "../../helpers/ResetLocation";
import WelcomeSection from "./WelcomeSection";
import ContactUsLanding from "./ContactUsLanding";
import Hero from "./Hero";
import OurServices from "./OurServices";
import PizzaMenuPreview from "./PizzaMenuPreview";
import Gallery from "./Gallery";
import MenuPricingPreview from "./MenuPricingPreview";
import StatsPreview from "./StatsPreview";
import MenuSlider from "./MenuSlider";
import axios from "axios";

function Home() {
  const baseUrl = "https://29201796-3b03-452f-abee-635c05c2d9cb.mock.pstmn.io"

  const [homeData, setHomeData] = useState({
    menu_slider: {
      thumbnail: {},
      products: [],
      categories: []
    }
  })

  useEffect(() => {
    axios.get(`${baseUrl}/home`)
      .then(res => {
        setHomeData(res.data)
        // console.log("before")
        // console.log(homeData)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <React.Fragment>
      <Hero />
      <WelcomeSection />
      <ContactUsLanding />
      <OurServices />
      <PizzaMenuPreview />
      <MenuPricingPreview />
      <Gallery />
      <StatsPreview />
      <MenuSlider
        temp0 = {console.log("INIT")}
        temp2={console.log(homeData.menu_slider)}
        thumbnail={homeData.menu_slider.thumbnail}
        categories={homeData.menu_slider.categories}
        products={homeData.menu_slider.products} />
    </React.Fragment>
  )
}

export default Home;