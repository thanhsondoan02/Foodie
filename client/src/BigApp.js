import { useEffect, useState } from "react";
import AppCms from "./AppCms";
import App from "./App";

function BigApp() {
  const [isCms, setIsCms] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes('/cms')) {
      setIsCms(true);
    }
  }, []);

  return (
    <>
      {isCms ? <AppCms /> : <App />}
    </>
  )
}

export default BigApp;