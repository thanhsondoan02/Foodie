import React from "react";

const CartItems = ({ foods }) => {
  return (
    <React.Fragment>
      {foods.map((food) => {
        return (
          <section className="history-item" key={food.id}>
            <img src={food.ItemImg} alt={food.ItemName} />
            <section className="history-item-content">
              <section className="history-item-info">
                <h3 className="history-item-title">{food.ItemName}</h3>
                <p className="history-item-ingredients">{food.ItemIngredients}</p>
              </section>

              <section className="history-item-interaction">
                <section className="history-item-add-qty">
                  <p>X {food.Order_Food.quantity}</p>
                </section>

                <p className="history-item-price">${food.ItemPrice}</p>
              </section>
            </section>
          </section>
        );
      })
      }
    </React.Fragment>
  );
}



export default CartItems;