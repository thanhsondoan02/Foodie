import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import ResetLocation from './helpers/ResetLocation';
import { apiLogout } from './services/AccountService';
import { apiGetCart } from './services/CartService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CMS from './routes/cms/CMS';
import LoginFragmentCms from './components/login/LoginFragmentCms';
import HeaderCms from './routes/landing/HeaderCms';
import ContactCms from './routes/cms/contact/ContactCms';
import { apiCmsGetContact } from './services/CmsService';
import { toastError, toastSuccess } from './helpers/toastHelper';
import MailCms from './routes/cms/mail/MailCms';

function AppCms() {
  const [isMenuBoxOpen, setIsMenuBoxOpen] = useState(false);
  const [isLoginBoxOpen, setIsLoginBoxOpen] = useState(false);
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
    setIsValidAdmin(false);
    localStorage.removeItem('admin_token');
    try {
      await apiLogout();
    } catch (err) {
      console.log(err);
    }
  }

  const validateToken = async () => {
    try {
      const response = await apiCmsGetContact(1,1);
      if (response.data.EC === 0) {
        setIsValidAdmin(true);
      } else {
        console.log(response.data.EM);
        localStorage.removeItem('admin_token');
        setIsValidAdmin(false);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('admin_token');
      setIsValidAdmin(false);
      toastError(err);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('admin_token') !== null) {
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
            setIsValidAdmin={setIsValidAdmin}
            validateToken={validateToken} />
        }
        onLogoutClick={onLogoutClick}
        showModal={showModal}
        isMenuBoxOpen={isMenuBoxOpen}
        hideMenuBox={hideMenuBox}
        openLoginFragment={openLoginFragment}
        isValidLogin={isValidAdmin}
      />
      <Routes>
      </Routes>
      <Routes>
        <Route path="/cms" element={
          <CMS isValidAdmin={isValidAdmin} openLoginFragment={openLoginFragment} />} />
        <Route path="/cms/contact" element={<ContactCms isValidAdmin={isValidAdmin} openLoginFragment={openLoginFragment} />} />
        <Route path="/cms/mail" element={<MailCms isValidAdmin={isValidAdmin} openLoginFragment={openLoginFragment} />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppCms;
