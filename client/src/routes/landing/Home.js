import React, { useEffect, useState } from "react"
import Welcome from "./Welcome";
import DetailContact from "./DetailContact";
import AdVideo from "./AdVideo";
import OurServices from "./OurServices";
import Hot from "./Hot";
import Gallery from "./Gallery";
import StatsPreview from "./StatsPreview";
import MenuSlider from "./menu-slider/MenuSlider";
import Menu from "./Menu";
import Subscribe from "./Subscribe";
import Blog from "./Blog";
import SimpleContact from "./SimpleContact";
import homeData from "./HomeData";
import { apiGetBlogList } from "../../services/BlogService";
import { toastError } from "../../helpers/toastHelper";

function Home() {
  const [posts, setPosts] = useState([]);

  const getBlogPostsServer = async () => {
    try {
      const response = await apiGetBlogList(1)
      if (response.data.EC === 0) {
        setPosts(response.data.DT.blogs)
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Home";
    getBlogPostsServer();
  }, []);

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
      <SimpleContact
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
      <Subscribe />
      <Blog
        title={homeData.blog.title}
        description={homeData.blog.description}
        posts={posts}
      />
      <DetailContact
        position={homeData.detailContact.position}
        zoomLevel={homeData.detailContact.zoomLevel}
        title={homeData.detailContact.title}
        description={homeData.detailContact.description}
        info={homeData.detailContact.info}
      />
    </React.Fragment>
  )
}

export default Home;