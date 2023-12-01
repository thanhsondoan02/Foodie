import React, { useEffect, useState } from "react"
// import ResetLocation from "../../helpers/ResetLocation";
import Welcome from "./Welcome";
import Contact from "./ContactUsLanding";
import AdVideo from "./AdVideo";
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
    adVideo: {
      span: "",
      header: "",
      description: "",
      vid: ""
    },
    welcome: {
      header: "",
      spanInHeader: {
        start: 0,
        end: 0,
      },
      description: "",
      pizzaOne: "",
      pizzaTwo: "",
      thumbnail: {
        img375: "",
        img700: "",
        img1440: ""
      }
    },
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
      <AdVideo
        span={homeData.adVideo.span}
        header={homeData.adVideo.header}
        description={homeData.adVideo.description}
        vid={homeData.adVideo.vid}
      />
      <Welcome
        header={homeData.welcome.header}
        spanInHeader={homeData.welcome.spanInHeader}
        description={homeData.welcome.description}
        pizzaOne={homeData.welcome.pizzaOne}
        pizzaTwo={homeData.welcome.pizzaTwo}
        thumbnail={homeData.welcome.thumbnail}
      />
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