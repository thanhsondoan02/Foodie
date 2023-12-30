import React, { useEffect, useState } from "react";
import ScrollButton from "../../helpers/ScrollButton";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import "./cart.css";
import { apiCartOrder, apiDeleteCartItem, apiGetCart, apiUpdateCart } from "../../services/CartService";
import CartTotals from "./CartTotals";
import NotLoginCart from "./NotLoginCart";
import { toastError, toastSuccess } from "../../helpers/toastHelper";
import { debounce } from "lodash";
import SuccessCart from "./SuccessCart";

const Cart = ({ isValidLogin, openLoginFragment }) => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const getDataFromServer = async () => {
    setIsLoading(true);
    setFoods([]);
    try {
      const response = await apiGetCart();
      if (response.data.EC === 0) {
        if (response.data.DT.foods.length === 0) {
          setFoods([]);
        } else {
          setOrderId(response.data.DT.foods[0].id)
          let foodList = response.data.DT.foods[0].Food
          setFoods(foodList);
          setTotalPrice(response.data.DT.foods[0].total_money);

          let quantity = 0
          for (let i = 0; i < foodList.length; i++) {
            quantity += foodList[i].Order_Food.quantity
          }
          setTotalQuantity(quantity);
        }
      } else {
        console.log(response.data.EM);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  const updateQuantity = (foodId, quantity) => {
    updateUiQuantity(foodId, quantity);
    debounceUpdateQuantityToServer(foodId, quantity);
  }

  const updateUiQuantity = (foodId, quantity) => {
    let foodIndex = foods.findIndex((food) => food.id === foodId);
    let oldQuantity = foods[foodIndex].Order_Food.quantity;
    foods[foodIndex].Order_Food.quantity = quantity;
    document.querySelector(`.cart-item:nth-child(${foodIndex + 1}) .cart-item-add-qty p`).innerHTML = quantity;

    setTotalQuantity(totalQuantity + quantity - oldQuantity);
    setTotalPrice(totalPrice + (quantity - oldQuantity) * foods[foodIndex].ItemPrice);
  }

  const updateQuantityToServer = async (foodId, quantity) => {
    try {
      const response = await apiUpdateCart(orderId, foodId, quantity);
      if (response.data.EC === 0) {
        // update food state
        let foodIndex = foods.findIndex((food) => food.id === foodId);
        foods[foodIndex].Order_Food.quantity = quantity;
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  const debounceUpdateQuantityToServer = debounce(updateQuantityToServer, 1000);

  const deleteItem = (foodId) => {
    let foodIndex = foods.findIndex((food) => food.id === foodId);
    let oldPrice = foods[foodIndex].ItemPrice * foods[foodIndex].Order_Food.quantity;
    foods.splice(foodIndex, 1);
    setFoods(foods);
    setTotalQuantity(totalQuantity - 1);
    setTotalPrice(totalPrice - oldPrice);
    deleteItemServer(foodId);
  }

  const deleteItemServer = async (foodId) => {
    try {
      const response = await apiDeleteCartItem(orderId, foodId);
      if (response.data.EC === 0) {
        toastSuccess('Deleted successfully!')
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  const orderNowServer = async () => {
    try {
      const response = await apiCartOrder();
      if (response.data.EC === 0) {
        setIsOrderSuccess(true);
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  const onOrderClick = () => {
    orderNowServer()
  }

  useEffect(() => {
    document.title = "Shopping Cart | Pizza Time";
    if (isValidLogin) getDataFromServer();
  }, [isValidLogin]);

  return (
    isOrderSuccess ?
      <main className="cart">
        <article className="cart-content">
          <SuccessCart />
        </article>
      </main>
      :
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
                    price={totalPrice}
                    quantity={totalQuantity}
                    isInCartPage={true}
                    openLoginFragment={openLoginFragment}
                    onOrderClick={onOrderClick}
                  />
                
                }
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
              />}
          </article>
          <ScrollButton />
        </main>
      :
      <main className="cart">
        <article className="cart-content">
          <NotLoginCart openLoginFragment={openLoginFragment} />
        </article>
      </main>
  )
}

export default Cart;
