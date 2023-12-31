import React from 'react'
import logo from '../../assets/logo.png'
import openMenu from '../../assets/open-menu.svg'
import closeMenu from '../../assets/close-menu.svg'
import { NavLink } from 'react-router-dom'
import Cart from '../../assets/cart-icon.png'
import SuccessMsg from '../../components/SuccessMsg'
import resetLocation from '../../helpers/ResetLocation'

const HeaderCms = ({ loginModal, onLogoutClick, showModal, isMenuBoxOpen,
  hideMenuBox, openLoginFragment, isValidLogin }) => {
  const location = [
    {
      path: 'cms/contact',
      name: 'Contact',
    },
  ]

  return (
    <header>
      {loginModal}
      <nav className="main-nav flex-container flex-row txt-center">
        <NavLink
          onClick={() => {
            resetLocation()
            hideMenuBox()
          }}
          to="/cms"
          className="logo-styling flex-container flex-row txt-center txt-white"
        >
          <img
            width="50"
            height="50"
            className="logo"
            src={logo}
            alt="Foodie Restaurant logo"
          />
          <h1 style={{ textAlign: "start" }}>
            Foodie <span>CMS</span>
          </h1>
        </NavLink>
        <ul className={`navigation-menu flex-row pop-font ${isMenuBoxOpen ? 'active' : ''}`}>

          {location.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  onClick={() => {
                    resetLocation()
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

          <li>
            <div className="login-and-cart">
              {isValidLogin ? (
                <div
                  className="passive-button-style txt-white"
                  onClick={() => {
                    resetLocation()
                    onLogoutClick()
                  }}
                >
                  Log out
                </div>
              ) : (
                <div
                  className="passive-button-style txt-white"
                  onClick={() => {
                    resetLocation()
                    openLoginFragment()
                  }}
                >
                  Log in
                </div>
              )}
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


export default HeaderCms;