import React, { useEffect } from "react"
import ResetLocation from "../../helpers/ResetLocation"
import WelcomeSection from "./WelcomeSection";

const RootSection = () => {
  useEffect(() => {
    document.title = "Pizza Time"
    // ResetLocation()
  }, []);
  return (
    <React.Fragment>
      <WelcomeSection />
    </React.Fragment>
  )
}

export default RootSection;