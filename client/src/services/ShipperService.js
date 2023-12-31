import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"

export const apiShipperGetOrder = (page, limit) => {
  let token = localStorage.getItem('admin_token');
  return axios.get(
    `${baseUrl}/api/v1/order/shipper/all?page=${page}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}

export const apiShipperStartDeliver = (orderId) => {
  let token = localStorage.getItem('admin_token');
  return axios.post(
    `${baseUrl}/api/v1/order/shipper/delivering?orderId=${orderId}`,
    '',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}

export const apiShipperEndDeliver = (orderId) => {
  let token = localStorage.getItem('admin_token');
  return axios.post(
    `${baseUrl}/api/v1/order/shipper/confirm?orderId=${orderId}`,
    '',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}