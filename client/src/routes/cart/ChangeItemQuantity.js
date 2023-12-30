import React from "react";

const ChangeItemQuantity = ({ updateQuantity, food }) => {

  return (
    <section className="cart-item-add-qty">
      <button
        onClick={() => {
          updateQuantity(food.id, food.Order_Food.quantity + 1)
        }}
      >
        +
      </button>
      <p>{food.Order_Food.quantity}</p>
      <button
        onClick={() => {
          if (food.Order_Food.quantity === 1) return;
          updateQuantity(food.id, food.Order_Food.quantity - 1)
        }}
      >
        -
      </button>
    </section>
  );
}

export default ChangeItemQuantity;
