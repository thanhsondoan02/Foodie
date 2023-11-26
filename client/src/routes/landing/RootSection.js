import React, { useEffect } from "react"
import ResetLocation from "../../helpers/ResetLocation";
import WelcomeSection from "./WelcomeSection";
import ContactUsLanding from "./ContactUsLanding";
import Hero from "./Hero";
import OurServices from "./OurServices";
import PizzaMenuPreview from "./PizzaMenuPreview";
import Gallery from "./Gallery";
import MenuPricingPreview from "./MenuPricingPreview";

const RootSection = () => {
  useEffect(() => {
    document.title = "Pizza Time";
    // ResetLocation();
  }, []);
  return (
    <React.Fragment>
      <Hero />
      <WelcomeSection />
      <ContactUsLanding />
      <OurServices />
      <PizzaMenuPreview />
      <MenuPricingPreview />
      <Gallery />
    </React.Fragment>
  )
}

export default RootSection;