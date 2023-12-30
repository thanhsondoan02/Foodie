import React, { useEffect, useState } from "react";
import ScrollButton from "../../helpers/ScrollButton";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import "./cart.css";
import { apiGetCart } from "../../services/CartService";
import CartTotals from "./CartTotals";
import NotLoginCart from "./NotLoginCart";

const Cart = ({ isValidLogin, openLoginFragment }) => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const getDataFromServer = async () => {
    setIsLoading(true);
    setFoods([]);
    try {
      const response = await apiGetCart();
      if (response.data.EC === 0) {
        if (response.data.DT.foods.length === 0) {
          setFoods([]);
        } else {
          let foodList = response.data.DT.foods[0].Food
          setFoods(foodList);
          setPrice(response.data.DT.foods[0].total_money);

          let quantity = 0
          for (let i = 0; i < foodList.length; i++) {
            quantity += foodList[i].Order_Food.quantity
          }
          setQuantity(quantity);
        }
      } else {
        console.log(response.data.EM);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Shopping Cart | Pizza Time";
    if (isValidLogin) getDataFromServer();
  }, [isValidLogin]);

  return (
    isValidLogin ?
      isLoading ? <div className="loading">Loading</div> :
        <main className="cart">
          <h2>Shopping cart</h2>
          <article className="cart-content">
            {foods.length === 0 ?
              <EmptyCart />
              :
              <CartItems
                foods={foods}
                cartTotals={
                  <CartTotals
                    price={price}
                    quantity={quantity}
                    isInCartPage={true}
                    openLoginFragment={openLoginFragment}
                  />
                }
              />}
          </article>
          <ScrollButton />
        </main>
      :
      <main className="cart">
        <article className="cart-content">
          <NotLoginCart openLoginFragment={openLoginFragment}/>
        </article>
      </main>
  )
}

export default Cart;
