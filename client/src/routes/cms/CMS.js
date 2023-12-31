import { useEffect } from "react"
import NotLoginCms from "./NotLoginCms";

function CMS({ isValidAdmin, openLoginFragment }) {

  useEffect(() => {
    document.title = "Foodie Restaurant | CMS";
  }, [isValidAdmin]);

  return (
    <>
      {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
        :
        <main className='not-login-cms'>
          <p>Welcome to our Content Management System !</p>

          <div className="meme">
            <img src="https://media1.giphy.com/media/LUYUCZHGwkwWXU3I1A/giphy.gif"
              alt="Welcome gif" />
            <img src="https://i.kym-cdn.com/photos/images/original/001/082/426/6ff.gif"
              alt="Welcome gif" />
          </div>
        </main>
      }
    </>
  )
}

export default CMS