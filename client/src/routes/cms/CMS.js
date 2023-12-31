import { useEffect } from "react"

function CMS({isValidAdmin, openLoginFragment}) {

  useEffect(() => {
    document.title = "Foodie Restaurant | CMS";
    if (!isValidAdmin) {
      openLoginFragment();
    }
  }, []);

  return (
    <div>
      <h1>CMS</h1>
    </div>
  )
}

export default CMS