import React from "react";
import logo from '../../assets/images/logo.png'
import openMenu from '../../assets/images/open-menu.svg'
import closeMenu from '../../assets/images/close-menu.svg'
import { NavLink, Link } from "react-router-dom";
import Cart from '../../assets/images/cart-icon.png'
import SuccessMsg from '../../components/SuccessMsg'
import ResetLocation from '../../helpers/ResetLocation'

const Header = ({
  loginModal,
  productQuantity,
  handleLogout,
  showModal,
  isModalActive,
  hideMenu,
  validLogin,
  activeLoginModal
}) => {
  return (
    <header>
      {loginModal}
      <nav className="main-nav flex-container flex-row txt-center">
        <NavLink
          onClick={() => {
            ResetLocation()
            hideMenu()
          }}
          to="/"
          className='logo-styling flex-container flex-row txt-center txt-white'>
          <img
            width="50"
            height="50"
            className="logo"
            src={logo}
            alt="Foodie Pizza Logo" />
          <h1>
            Pizza <span>Time</span>
          </h1>
        </NavLink>
        <ul className={`navigation-menu flex-row pop-front ${isModalActive ? "active" : ""}`}>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/menu">
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/blog">
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/about">
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/contact">
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/menu">
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/blog">
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/about">
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/contact">
              Contact
            </NavLink>
          </li>

          {validLogin ? <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { textDecoration: "none", color: "#ff6240" } : {}}
              onClick={() => {
                ResetLocation()
                hideMenu()
              }}
              className="txt-white"
              to="/contact">
              Contact
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
                  }}>Log out</Link>
              ) : (
                <div
                  className="passive-button-style txt-white"
                  onClick={() => {
                    ResetLocation()
                    activeLoginModal()
                  }}>Login</div>
              )}
              <NavLink
                className="cart-btn active-button-style txt-white"
                to="/cart"
                onClick={() => {
                  ResetLocation()
                  hideMenu()
                }}>
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
          className="burgers-bars"
          src={isModalActive ? closeMenu : openMenu}
          alt={isModalActive ? "Close Menu" : "Open Menu"}
          onClick={showModal} />
      </nav>
    </header>
  )
}

export default Header;