import React from "react";
import ChangeItemQuantity from "./ChangeItemQuantity";

const CartItem = ({
  handleAddProduct,
  handleRemoveProduct,
  clearCart,
  foods, cartTotals }) => {
  return (
    <React.Fragment>
      {foods.map((food) => {
        return (
          <section className="cart-item" key={food.id}>
            <img src={food.ItemImg} alt={food.ItemName} />
            <section className="cart-item-content">
              <section className="cart-item-info">
                <h3 className="cart-item-title">{food.ItemName}</h3>
                <p className="cart-item-ingredients">{food.ItemIngredients}</p>
              </section>

              <section className="cart-item-interaction">
                <ChangeItemQuantity
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  food={food}
                />

                <p className="cart-item-price">${food.ItemPrice}</p>
              </section>
            </section>
          </section>
        );
      })
      }
      <button onClick={clearCart} className="cart-clear-btn">
        remove all items from the cart
      </button>
      {cartTotals}
    </React.Fragment>
  );
}



export default CartItem;