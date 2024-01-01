import { useEffect, useState } from "react";
import AppCms from "./AppCms";
import App from "./App";
import AppShipper from "./AppShipper";
import axios from "axios";

function BigApp() {
  const [isCms, setIsCms] = useState(false);
  const [isShipper, setIsShipper] = useState(false);

  useEffect(() => {
    setIsCms(window.location.pathname.includes('/cms'));
    setIsShipper(window.location.pathname.includes('/shipper'));
    axios.defaults.withCredentials = false
  }, []);

  return (
    <>
      {isCms ? <AppCms /> : isShipper ? <AppShipper /> : <App />}
    </>
  )
}

export default BigApp;