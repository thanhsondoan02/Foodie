/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toastError, toastSuccess } from '../../helpers/toastHelper';
import resetLocation from '../../helpers/ResetLocation';
import NotLoginCms from '../cms/NotLoginCms';
import { Loading } from '../cms/Loading';
import { parserTime } from '../../helpers/parseTime';
import {
  apiShipperGetOrder,
  apiShipperStartDeliver,
  apiShipperEndDeliver
} from '../../services/ShipperService';

export default function OrderShipper({ isValidAdmin, openLoginFragment }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const status1 = "Order Verify from Admin"
  const status2 = "Shipper Delivering"
  const status3 = "Paid"

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
      const response = await apiShipperGetOrder(page, limit);
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
      toastError(err.message);
    }
    setIsLoading(false);
  }

  const updateUiFalse = (id, newValue) => {
    let newOrders = orders.map(order => {
      if (order.id === id) {
        order.status_payment = newValue
      }
      return order
    })
    setOrders(newOrders)
  }

  const startDeliverServer = async (id) => {
    try {
      const response = await apiShipperStartDeliver(id);
      if (response.data.EC === 0) {
        toastSuccess("Start delivering!")
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
        updateUiFalse(id, status1)
      }
    } catch (err) {
      console.log(err);
      toastError("Error: " + err.message);
      updateUiFalse(id, status1)
    }
  }

  const endDeliverServer = async (id) => {
    try {
      const response = await apiShipperEndDeliver(id);
      if (response.data.EC === 0) {
        toastSuccess("Delivered to customer!")
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
        updateUiFalse(id, status2)
      }
    } catch (err) {
      console.log(err);
      toastError(err.message);
      updateUiFalse(id, status2)
    }
  }

  const statusCode = (value) => {
    if (value === status1) {
      return 1
    } else if (value === status2) {
      return 2
    } else return 3
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Shipper Order";
    if (isValidAdmin) {
      getOrderFromServer(1);
    }
  }, [isValidAdmin]);

  return (
    <>
      {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
        : isLoading ? <Loading message={"Loading Order..."} /> 
        : orders.length === 0 ? <Loading message={"No order to deliver!"} /> :
          <main className='contact-cms-main'>
            <h1>Order from your customer</h1>

            <table>
              <colgroup>
                <col className="order-cms-order-id" />
                <col className="order-cms-order-time" />
                <col className="order-cms-delivery-time" />
                <col className="order-cms-status" />
                <col className="order-cms-total-money" />
                <col className="order-cms-customer-name" />
                <col className="order-cms-customer-address" />
                <col className="order-cms-customer-phone" />
                <col className="order-cms-verify" />
              </colgroup>
              <tr>
                <th>Id</th>
                <th>Order Time</th>
                <th>Delivery Time</th>
                <th>Status</th>
                <th>Total Money</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Action</th>
              </tr>
              {
                orders.map((order, _) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{parserTime(order.order_time)}</td>
                    <td>{parserTime(order.delivery_time)}</td>
                    <td>{order.status_payment}</td>
                    <td>{order.total_money}</td>
                    <td>{order.User.fullName}</td>
                    <td>{order.User.address}</td>
                    <td>{order.User.phone}</td>
                    <td>
                      {
                        statusCode(order.status_payment) === 1 || statusCode(order.status_payment) === 2
                          ?
                          <button className="active-button-style"
                            onClick={() => {
                              if (statusCode(order.status_payment) === 1) {
                                startDeliverServer(order.id)
                                order.status_payment = status2
                              } else {
                                endDeliverServer(order.id)
                                order.status_payment = status3
                              }
                              setOrders([...orders])
                            }}
                          >
                            {statusCode(order.status_payment) === 1 ? "Start" : "Done"}
                          </button>
                          :
                          null
                      }

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
