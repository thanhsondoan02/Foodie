import React from "react";

const ChangeItemQuantity = ({ handleAddProduct, handleRemoveProduct, food }) => {
  return (
    <section className="cart-item-add-qty">
      <button
        onClick={() => {
          handleAddProduct(food, food.userSelectedAttributes);
        }}
      >
        +
      </button>
      <p>{food.Order_Food.quantity}</p>
      <button
        onClick={() => {
          handleRemoveProduct(food, food.userSelectedAttributes);
        }}
      >
        -
      </button>
    </section>
  );
}

export default ChangeItemQuantity;
