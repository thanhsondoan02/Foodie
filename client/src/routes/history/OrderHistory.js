/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toastError, toastSuccess } from '../../helpers/toastHelper';
import resetLocation from '../../helpers/ResetLocation';
import NotLoginCms from '../cms/NotLoginCms';
import { Loading } from '../cms/Loading';
import { parserTime } from '../../helpers/parseTime';
import { apiOrderHistory } from '../../services/AccountService';
import { response } from './orderHistoryData'; // remove this line when api is ready
import ScrollButton from '../../helpers/ScrollButton';
import CartTotals from '../cart/CartTotals';
import CartItems from './CartItems';
import "./orderHistory.css"


export default function OrderHistory({ isValidLogin, openLoginFragment }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onPageChange = (event) => {
    getOrderFromServer(event.selected + 1);
    resetLocation();
  };

  const getOrderFromServer = async (page) => {
    setIsLoading(true);
    let limit = 3
    setCurrentPage(page);
    setTotalPages(0);
    setOrders([]);
    try {
      // const response = await apiOrderHistory(page, limit);
      if (response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages)
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
    isValidLogin = true; // remove this line when api is ready
    document.title = "Foodie Restaurant | Contact CMS";
    if (isValidLogin) {
      getOrderFromServer(1);
    }
  }, [isValidLogin]);

  return (
    <>
      {isValidLogin ? <NotLoginCms openLoginFragment={openLoginFragment} />
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

              <ReactPaginate
                className="contact-cms-pagination"
                breakLabel="..."
                nextLabel=" &#62;"
                onPageChange={onPageChange}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="&#60;"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
              />
            </main>
      }
    </>
  );
}
