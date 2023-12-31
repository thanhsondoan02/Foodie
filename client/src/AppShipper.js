import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import ResetLocation from './helpers/ResetLocation';
import { apiLogout } from './services/AccountService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CMS from './routes/cms/CMS';
import LoginFragmentCms from './components/login/LoginFragmentCms';
import ContactCms from './routes/cms/contact/ContactCms';
import { apiCmsGetContact, apiCmsGetOrder } from './services/CmsService';
import { toastError } from './helpers/toastHelper';
import MailCms from './routes/cms/mail/MailCms';
import OrderCms from './routes/cms/order/OrderCms';
import HeaderShipper from './routes/landing/HeaderShipper';
import OrderShipper from './routes/ship/OrderShipper';
import LoginFragmentShipper from './components/login/LoginFragmentShipper';
import { apiShipperGetOrder } from './services/ShipperService';

function AppShipper() {
  const [isMenuBoxOpen, setIsMenuBoxOpen] = useState(false);
  const [isLoginBoxOpen, setIsLoginBoxOpen] = useState(false);
  const [isValidShipper, setIsValidAdmin] = useState(false);

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
    setIsValidAdmin(false);
    localStorage.removeItem('shipper_token');
    try {
      await apiLogout();
    } catch (err) {
      console.log(err);
    }
  }

  const validateToken = async () => {
    try {
      const response = await apiShipperGetOrder(1, 1);
      if (response.data.EC === 0) {
        setIsValidAdmin(true);
      } else {
        console.log(response.data.EM);
        localStorage.removeItem('shipper_token');
        setIsValidAdmin(false);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('shipper_token');
      setIsValidAdmin(false);
      toastError(err.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shipper_token') !== null) {
      validateToken();
    }
  }, []);

  return (
    <BrowserRouter>
      {isValidShipper}
      <HeaderShipper
        loginModal={
          <LoginFragmentShipper
            closeLoginFragment={closeLoginFragment}
            isLoginBoxOpen={isLoginBoxOpen}
            hideMenuBox={hideMenuBox}
            setIsValidAdmin={setIsValidAdmin}
            validateToken={validateToken} />
        }
        onLogoutClick={onLogoutClick}
        showModal={showModal}
        isMenuBoxOpen={isMenuBoxOpen}
        hideMenuBox={hideMenuBox}
        openLoginFragment={openLoginFragment}
        isValidLogin={isValidShipper}
      />
      <Routes>
      </Routes>
      <Routes>
        <Route path="/shipper" element={
          <OrderShipper isValidAdmin={isValidShipper} openLoginFragment={openLoginFragment} />} />

      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppShipper;
