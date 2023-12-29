import React, { useEffect } from "react";
import ScrollButton from "../../helpers/ScrollButton";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import "./cart.css";

const Cart = ({ cartItems }) => {
  useEffect(() => {
    document.title = "Shopping Cart | Pizza Time";
  }, []);
  return (
    <main className="cart">
      <h2>Shopping cart</h2>
      <article className="cart-content">
        {cartItems.length === 0 ? <EmptyCart /> : 
        <CartItems 
          
        />}
      </article>
      <ScrollButton />
    </main>
  );
}

export default Cart;
