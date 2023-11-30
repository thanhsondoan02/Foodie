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
    statsPreview: [],
    menuSlider: {
      thumbnail: {},
      products: [],
      categories: []
    }
  })

  useEffect(() => {
    axios.get(`${baseUrl}/home`)
      .then(res => {
        setHomeData(res.data)
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
      <StatsPreview statsPreview = {homeData.statsPreview}/>
      <MenuSlider
        thumbnail={homeData.menuSlider.thumbnail}
        categories={homeData.menuSlider.categories}
        products={homeData.menuSlider.products} />
    </React.Fragment>
  )
}

export default Home;