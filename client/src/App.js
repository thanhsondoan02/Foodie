import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './routes/landing/Header';
import ResetLocation from './helpers/ResetLocation';
import LoginModal from './components/login/LoginModal';
import Home from './routes/landing/Home';
import Blog from './routes/blog/Blog';

function App() {
  const [productQuantity, setProductQuantity] = useState(0);
  const [validLogin, setValidLogin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [loginModalWindow, setLoginModelWindow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const activeLoginModal = () => {
    hideMenu();
    setLoginModelWindow(!loginModalWindow);
  };

  const hideMenu = () => {
    setIsModalActive(false);
  };

  const showModal = () => {
    setIsModalActive(!isModalActive);
  }

  const handleLogout = () => {
    setValidLogin(false);
    hideMenu();
    setCurrentUser({});
    ResetLocation();
    setCartItems([]);
    setProductQuantity(0);
    sessionStorage.clear();
  }

  const getUser = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`);
      const body = await response.json();
      setCurrentUser(body.data[0]);
      const jsonUser = JSON.stringify(body.data[0]);
      sessionStorage.setItem('currentUser', jsonUser);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }


  return (
    <BrowserRouter>
      <Header
        loginModal={
          <LoginModal
            validLogin={validLogin}
            setValidLogin={setValidLogin}
            setLoginModalWindow={setLoginModelWindow}
            loginModalWindow={loginModalWindow}
            hideMenu={hideMenu}
            getUser={getUser}
            setCurrentUser={setCurrentUser} />
        }
        activeLoginModal={activeLoginModal}
        showModal={showModal}
        isModalActive={isModalActive}
        hideMenu={hideMenu}
        handleLogout={handleLogout}
        validLogin={validLogin}
        productQuantity={productQuantity} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
