import React, { useEffect, useState } from "react"
// import ResetLocation from "../../helpers/ResetLocation";
import WelcomeSection from "./WelcomeSection";
import Contact from "./ContactUsLanding";
import Hero from "./Hero";
import OurServices from "./OurServices";
import Hot from "./Hot";
import Gallery from "./Gallery";
import StatsPreview from "./StatsPreview";
import MenuSlider from "./menu-slider/MenuSlider";
import axios from "axios";
import Menu from "./Menu";

function Home() {
  const baseUrl = "https://29201796-3b03-452f-abee-635c05c2d9cb.mock.pstmn.io"

  const [homeData, setHomeData] = useState({
    contact: {
      img: "",
      lines: []
    },
    service: [],
    hot: [],
    menu: [],
    gallery: {
      img375: [],
      img700: []
    },
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
      <Contact 
        img={homeData.contact.img}
        lines={homeData.contact.lines}
      />
      <OurServices
        service={homeData.service} />
      <Hot 
        hot={homeData.hot}
      />
      <Menu
        menu={homeData.menu}
      />
      <Gallery
        img375={homeData.gallery.img375}
        img700={homeData.gallery.img700}
      />
      <StatsPreview
        statsPreview={homeData.statsPreview}
      />
      <MenuSlider
        thumbnail={homeData.menuSlider.thumbnail}
        categories={homeData.menuSlider.categories}
        products={homeData.menuSlider.products}
      />
    </React.Fragment>
  )
}

export default Home;