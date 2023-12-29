import React from 'react'
import logo from '../../assets/images/logo.png'
import openMenu from '../../assets/images/open-menu.svg'
import closeMenu from '../../assets/images/close-menu.svg'
import { Link, NavLink } from 'react-router-dom'
import Cart from '../../assets/images/cart-icon.png'
import SuccessMsg from '../../components/SuccessMsg'
import ResetLocation from '../../helpers/ResetLocation'

const Header = ({ loginModal, productQuantity, handleLogout,
  showModal, isMenuBoxOpen, hideMenuBox,
  validLogin, openLoginFragment }) => {
  const location = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/menu',
      name: 'Menu',
    },
    {
      path: '/blog',
      name: 'Blog',
    },
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/contact',
      name: 'Contact',
    },
  ]

  return (
    <header>
      {loginModal}
      <nav className="main-nav flex-container flex-row txt-center">
        <NavLink
          onClick={() => {
            ResetLocation()
            hideMenuBox()
          }}
          to="/"
          className="logo-styling flex-container flex-row txt-center txt-white"
        >
          <img
            width="50"
            height="50"
            className="logo"
            src={logo}
            alt="Pizza Time logo"
          />
          <h1>
            Pizza <span>Time</span>
          </h1>
        </NavLink>
        <ul className={`navigation-menu flex-row pop-font ${isMenuBoxOpen ? 'active' : ''}`}>

          {location.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  onClick={() => {
                    ResetLocation()
                    hideMenuBox()
                  }}
                  style={({ isActive }) =>
                    isActive ? { textDecoration: 'none', color: '#ff6240', } : {}}
                  className="txt-white"
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            )
          })}

          {validLogin ? <li>
            <NavLink
              onClick={() => {
                ResetLocation()
                hideMenuBox()
              }}
              style={({ isActive }) =>
                isActive ? { textDecoration: 'none', color: '#ff6240', } : {}}
              className="txt-white"
              to="/profile"
            >
              Profile
            </NavLink>
          </li> : null}
          <li>
            <div className="login-and-cart">
              {validLogin ? (
                <Link
                  to="/"
                  className="passive-button-style txt-white"
                  onClick={() => {
                    ResetLocation()
                    handleLogout()
                  }}
                >
                  Log out
                </Link>
              ) : (
                <div
                  className="passive-button-style txt-white"
                  onClick={() => {
                    ResetLocation()
                    openLoginFragment()
                  }}
                >
                  Log in
                </div>
              )}
              <NavLink
                className="cart-btn active-button-style txt-white"
                to="/cart"
                onClick={() => {
                  ResetLocation()
                  hideMenuBox()
                }}
              >
                <img src={Cart} alt="" aria-hidden="true" />
                <p>Cart</p>
                <p>({productQuantity})</p>
              </NavLink>
            </div>
          </li>
        </ul>
        <img
          width="50"
          height="50"
          className="burger-bars"
          src={isMenuBoxOpen ? closeMenu : openMenu}
          alt={isMenuBoxOpen ? "Close menu" : "Open menu"}
          onClick={showModal}
        />
      </nav>
      <SuccessMsg />
    </header>
  )
}
// }


export default Header;