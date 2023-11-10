import React, { useEffect } from "react"
import ResetLocation from "../../helpers/ResetLocation";
import WelcomeSection from "./WelcomeSection";
import ContactUsLanding from "./ContactUsLanding";
import Hero from "./Hero";
import OurServices from "./OurServices";
import PizzaMenuPreview from "./PizzaMenuPreview";

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
    </React.Fragment>
  )
}

export default RootSection;