/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import resetLocation from '../../../helpers/ResetLocation';
import {  apiCmsGetOrder, apiCmsVerifyOrder } from '../../../services/CmsService';
import { toastError, toastSuccess } from '../../../helpers/toastHelper';
import NotLoginCms from '../NotLoginCms';
import { Loading } from '../Loading';
import { parserTime } from '../../../helpers/parseTime';

export default function OrderCms({ isValidAdmin, openLoginFragment }) {
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
    let limit = 4
    setCurrentPage(page);
    setTotalPages(0);
    setOrders([]);
    try {
      const response = await apiCmsGetOrder(page, limit);
      if (response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages)
        let newOrders = response.data.DT.orders;
        setOrders(
          newOrders.map(order => {
            order.verified = order.status_payment === "Order Verify from Client" ? false : true
            return order
          }
        ))
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

  const updateUIVerifiedOrder = (id) => {
    let newOrders = orders.map(order => {
      if (order.id === id) {
        order.verified = true
        order.status_payment = "Order Verify from Client"
      }
      return order
    })
    setOrders(newOrders)
  }

  const verifyOrderServer = async (id) => {
    try {
      const response = await apiCmsVerifyOrder(id);
      if (response.data.EC === 0) {
        toastSuccess("Verify order successfully")
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
        updateUIVerifiedOrder(id, false)
      }
    } catch (err) {
      console.log(err);
      toastError(err);
      updateUIVerifiedOrder(id, false)
    }
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Contact CMS";
    if (isValidAdmin) {
      getOrderFromServer(1);
    }
  }, [isValidAdmin]);

  return (
    <>
      {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
        : isLoading ? <Loading message={"Loading Order..."} /> :
          <main className='contact-cms-main'>
            <h1>Order from your customer</h1>

            <table>
              <colgroup>
                <col class="order-cms-order-id" />
                <col class="order-cms-order-time" />
                <col class="order-cms-delivery-time" />
                <col class="order-cms-status" />
                <col class="order-cms-total-money" />
                <col class="order-cms-shipper-id" />
                <col class="order-cms-customer-name" />
                <col class="order-cms-customer-address" />
                <col class="order-cms-customer-phone" />
                <col class="order-cms-verify" />
              </colgroup>
              <tr>
                <th>Id</th>
                <th>Order Time</th>
                <th>Delivery Time</th>
                <th>Status</th>
                <th>Total Money</th>
                <th>Shipper Id</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Verified</th>
              </tr>
              {
                orders.map((order, _) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{parserTime(order.order_time)}</td>
                    <td>{parserTime(order.delivery_time)}</td>
                    <td>{order.status_payment}</td>
                    <td>{order.total_money}</td>
                    <td>{order.shipper_id}</td>
                    <td>{order.User.fullName}</td>
                    <td>{order.User.address}</td>
                    <td>{order.User.phone}</td>
                    <td>
                      <input type='checkbox' id="verify-checkbox"
                        disabled={(order.status_payment === "Order Verify from Client") ? false : true}
                        checked={order.verified}
                        onChange={(e) => { 
                          order.verified = e.target.checked
                          order.status_payment = "Order Verify from Admin"
                          setOrders([...orders])
                          verifyOrderServer(order.id)
                        }}
                      ></input>
                    </td>
                  </tr>
                ))
              }
            </table>

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
