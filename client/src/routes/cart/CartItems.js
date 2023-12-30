import React from "react";
import ChangeItemQuantity from "./ChangeItemQuantity";

const CartItem = ({ foods, cartTotals, updateQuantity, deleteItem }) => {
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
                  updateQuantity={updateQuantity}
                  food={food}
                />

                <p className="cart-item-price">${food.ItemPrice}</p>
              </section>
            </section>

            <button className="cart-delete-button" onClick={() => { deleteItem(food.id) }}>
              <p>Delete</p>
            </button>
          </section>
        );
      })
      }
      {cartTotals}
    </React.Fragment>
  );
}



export default CartItem;