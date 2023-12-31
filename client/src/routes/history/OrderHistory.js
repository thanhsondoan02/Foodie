// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import { toastError, toastSuccess } from '../../helpers/toastHelper';
// import resetLocation from '../../helpers/ResetLocation';
// import NotLoginCms from '../cms/NotLoginCms';
// import { Loading } from '../cms/Loading';
// import { parserTime } from '../../helpers/parseTime';
// import {
//   apiShipperGetOrder,
//   apiShipperStartDeliver,
//   apiShipperEndDeliver
// } from '../../services/ShipperService';

// export default function OrderShipper({ isValidAdmin, openLoginFragment }) {
//   const [orders, setOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const onPageChange = (event) => {
//     getOrderFromServer(event.selected + 1);
//     resetLocation();
//   };

//   const getOrderFromServer = async (page) => {
//     setIsLoading(true);
//     let limit = 4
//     setCurrentPage(page);
//     setTotalPages(0);
//     setOrders([]);
//     try {
//       const response = await apiShipperGetOrder(page, limit);
//       if (response.data.EC === 0) {
//         setTotalPages(response.data.DT.totalPages)
//         let newOrders = response.data.DT.orders;
//         setOrders(
//           newOrders.map(order => {
//             order.verified = order.status_payment === "Order Verify from Client" ? false : true
//             return order
//           }
//           ))
//       } else {
//         console.log(response.data.EM);
//         toastError(response.data.EM);
//       }
//     } catch (err) {
//       console.log(err);
//       toastError(err);
//     }
//     setIsLoading(false);
//   }

//   const updateVerifiedOrder = (id, newValue) => {
//     let newOrders = orders.map(order => {
//       if (order.id === id) {
//         order.verified = newValue
//       }
//       return order
//     })
//     setOrders(newOrders)
//   }

//   useEffect(() => {
//     document.title = "Foodie Restaurant | Contact CMS";
//     if (isValidAdmin) {
//       getOrderFromServer(1);
//     }
//   }, [isValidAdmin]);

//   return (
//     <>
//       {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
//         : isLoading ? <Loading message={"Loading Order..."} /> :
//           <main className='contact-cms-main'>
//             <h1>Order from your customer</h1>

//             <table>
//               <colgroup>
//                 <col class="order-shipper-order-id" />
//                 <col class="order-shipper-order-time" />
//                 <col class="order-shipper-delivery-time" />
//                 <col class="order-shipper-status" />
//                 <col class="order-shipper-total-money" />
//                 <col class="order-shipper-customer-name" />
//                 <col class="order-shipper-customer-address" />
//                 <col class="order-shipper-customer-phone" />
//                 <col class="order-shipper-verify" />
//               </colgroup>
//               <tr>
//                 <th>Id</th>
//                 <th>Order Time</th>
//                 <th>Delivery Time</th>
//                 <th>Status</th>
//                 <th>Total Money</th>
//                 <th>Shipper Id</th>
//                 <th>Customer Name</th>
//                 <th>Customer Address</th>
//                 <th>Customer Phone</th>
//                 <th>Verified</th>
//               </tr>
//               {
//                 orders.map((order, _) => (
//                   <tr key={order.id}>
//                     <td>{order.id}</td>
//                     <td>{parserTime(order.order_time)}</td>
//                     <td>{parserTime(order.delivery_time)}</td>
//                     <td>{order.status_payment}</td>
//                     <td>{order.total_money}</td>
//                     <td>{order.shipper_id}</td>
//                     <td>{order.User.fullName}</td>
//                     <td>{order.User.address}</td>
//                     <td>{order.User.phone}</td>
//                     <td>
//                       <input type='checkbox' id="verify-checkbox"
//                         disabled={(order.status_payment === "Order Verify from Client") ? false : true}
//                         checked={order.verified}
//                         onChange={(e) => {
//                           order.verified = e.target.checked
//                           setOrders([...orders])
//                           startDeliverServer(order.id)
//                         }}
//                       ></input>
//                     </td>
//                   </tr>
//                 ))
//               }
//             </table>

//             <ReactPaginate
//               className="contact-cms-pagination"
//               breakLabel="..."
//               nextLabel=" &#62;"
//               onPageChange={onPageChange}
//               pageRangeDisplayed={3}
//               pageCount={totalPages}
//               previousLabel="&#60;"
//               renderOnZeroPageCount={null}
//               forcePage={currentPage - 1}
//             />
//           </main>
//       }
//     </>
//   );
// }
