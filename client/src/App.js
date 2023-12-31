import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './routes/landing/Header';
import ResetLocation from './helpers/ResetLocation';
import LoginFragment from './components/login/LoginFragment';
import Home from './routes/landing/Home';
import Menu from './routes/menu/Menu';
import Blog from './routes/blog/Blog';
import Contact from './routes/contact/Contact';
import About from './routes/about/About';
import Register from './routes/register/Register';
import Cart from './routes/cart/Cart';
import { apiLogout } from './services/AccountService';
import { apiGetCart } from './services/CartService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogPost from './routes/blog-post/BlogPost';
import Profile from './routes/profile/Profile';
import Careers from './routes/careers/Careers';
import Privacy from './routes/privacy/Privacy';
import Terms from './routes/term/Terms';
import Refunds from './routes/refund/Refunds';
import OrderHistory from './routes/history/OrderHistory';

function App() {
  const [isMenuBoxOpen, setIsMenuBoxOpen] = useState(false);
  const [isLoginBoxOpen, setIsLoginBoxOpen] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
      <Header
        loginModal={
          <LoginFragment
            closeLoginFragment={closeLoginFragment}
            isLoginBoxOpen={isLoginBoxOpen}
            hideMenuBox={hideMenuBox}
            validateToken={validateToken} />
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
        <Route path='/' element={<Home />} />
        <Route path="/menu" element={
          <Menu isValidLogin={isValidLogin}
            openLoginFragment={openLoginFragment}
            validateToken={validateToken} />
        } />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register openLoginFragment={openLoginFragment} />} />
        <Route path='/cart'
          element={<Cart isValidLogin={isValidLogin} openLoginFragment={openLoginFragment} />}
        />
        <Route path='/blog/:blogId' element={<BlogPost />} />
        <Route path='/profile' element={<Profile isValidLogin={isValidLogin}/>} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/history" element={<OrderHistory isValidLogin={isValidLogin} openLoginFragment={openLoginFragment}/>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
