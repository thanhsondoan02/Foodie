import React from "react";
import CheckoutBtn from "../checkout/CheckoutBtn";
import LinkButton from "../../components/LinkButton";
import ResetLocation from "../../helpers/ResetLocation";
import { Link } from "react-router-dom";

const CartTotals = ({ price, quantity, isInCartPage, openLoginFragment }) => {
  return (
    <article className="cart-carttotals">
      {quantity === 0 ? null : (
        <section className="cart-totals">
          <section className="totals-content">
            <section>
              <h4 className="cart-totals-sum">Quantity:</h4>
              <p> {quantity}</p>
            </section>
            <section>
              <h4 className="cart-totals-sum">Total:</h4>
              <p>$ {price}</p>
            </section>
          </section>
          {isInCartPage ?
            <section className="cart-interaction-btns">
              <CheckoutBtn
                validLogin={true}
                className="active-button-style"
                openLoginFragment={openLoginFragment}
              />
              <LinkButton
                onClick={ResetLocation}
                to="/menu"
                className="back-to-menu"
              >
                Back to menu
              </LinkButton>
            </section>
            :
            <section className="checkout-interaction-btns">
              <Link to="/payment" className="active-button-style" onClick={ResetLocation}>
                Proceed to payment
              </Link>
              <Link to="/menu" className="checkout-backtomenu-btn" onClick={ResetLocation}>
                Back to menu
              </Link>
            </section>
          }
        </section>
      )}
    </article>
  );
}

export default CartTotals;
