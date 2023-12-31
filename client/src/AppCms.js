import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import ResetLocation from './helpers/ResetLocation';
import { apiLogout } from './services/AccountService';
import { apiGetCart } from './services/CartService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CMS from './routes/cms/CMS';
import LoginFragmentCms from './components/login/LoginFragmentCms';
import HeaderCms from './routes/landing/HeaderCms';

function AppCms() {
  const [isMenuBoxOpen, setIsMenuBoxOpen] = useState(false);
  const [isLoginBoxOpen, setIsLoginBoxOpen] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isValidAdmin, setIsValidAdmin] = useState(false);

  const closeLoginFragment = () => {
    setIsLoginBoxOpen(false);
  }

  const hideMenuBox = () => {
    setIsMenuBoxOpen(false);
  }

  const openLoginFragment = () => {
    hideMenuBox();
    setIsLoginBoxOpen(true);
  };

  const showModal = () => {
    setIsMenuBoxOpen(!isMenuBoxOpen);
  }

  const onLogoutClick = async () => {
    setIsMenuBoxOpen(false);
    ResetLocation();
    localStorage.removeItem('token');
    setIsValidLogin(false);
    setCartCount(0);
    try {
      await apiLogout();
    } catch (err) {
      console.log(err);
    }
  }

  const validateToken = async () => {
    try {
      const response = await apiGetCart();
      if (response.data.EC === 0) {
        setIsValidLogin(true);
        setCartCount(response.data.DT.totalFoodInCart);
      } else {
        console.log(response.data.EM);
        localStorage.removeItem('token');
        setIsValidLogin(false);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('token');
      setIsValidLogin(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      validateToken();
    }
  }, []);

  return (
    <BrowserRouter>
      {isValidAdmin}
      <HeaderCms
        loginModal={
          <LoginFragmentCms
            closeLoginFragment={closeLoginFragment}
            isLoginBoxOpen={isLoginBoxOpen}
            hideMenuBox={hideMenuBox}
            validateToken={validateToken}
            setIsValidAdmin={setIsValidAdmin} />
        }
        onLogoutClick={onLogoutClick}
        showModal={showModal}
        isMenuBoxOpen={isMenuBoxOpen}
        hideMenuBox={hideMenuBox}
        openLoginFragment={openLoginFragment}
        isValidLogin={isValidLogin}
        cartCount={cartCount}
      />
      <Routes>
      </Routes>
      <Routes>
        <Route path="/cms" element={<CMS isValidAdmin={isValidAdmin} openLoginFragment={openLoginFragment} />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppCms;
