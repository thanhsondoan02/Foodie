/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { toastError } from '../../helpers/toastHelper';
import NotLoginCms from '../cms/NotLoginCms';
import { Loading } from '../cms/Loading';
import { parserTime } from '../../helpers/parseTime';
import {  apiOrderHistoryAll } from '../../services/AccountService';
import ScrollButton from '../../helpers/ScrollButton';
import CartItems from './CartItems';
import "./orderHistory.css"


export default function OrderHistory({ isValidLogin, openLoginFragment }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderFromServer = async (page) => {
    setIsLoading(true);
    setOrders([]);
    try {
      const response = await apiOrderHistoryAll();
      if (response.data.EC === 0) {
        setOrders(response.data.DT.orders)
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Contact CMS";
    if (isValidLogin) {
      getOrderFromServer(1);
    }
  }, [isValidLogin]);

  return (
    <>
      {!isValidLogin ? <NotLoginCms openLoginFragment={openLoginFragment} message={"view order history"}/>
        : isLoading ? <Loading message={"Loading Order..."} />
          : orders.length === 0 ? <Loading message={"You have not ordered yet!"} />
            :
            <main className='history'>
              <h2>Your order history</h2>

              {
                orders.map(order => {
                  return (
                    <div key={order.id} className='order-container'>
                      <info className='order-info'>
                        <p><b>Id:</b> {order.id}</p>
                        <p><b>Delivery time:</b> {parserTime(order.delivery_time)}</p>
                        <p><b>Total price:</b> {order.total_money} $</p>
                        <p><b>Payment status:</b> {order.status_payment}</p>
                        <p><b>Information:</b> {order.User.fullName}, {order.User.phone}, {order.User.address}</p>
                      </info>
                      <article className="history-content">
                        <CartItems
                          foods={order.Food}
                        />
                      </article>
                    </div>
                  )
                })
              }

              <ScrollButton />
            </main>
      }
    </>
  );
}
