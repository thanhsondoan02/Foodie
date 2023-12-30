import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"

const apiGetCart = () => {
  let token = localStorage.getItem('token');
  return axios.get(`${baseUrl}/api/v1/food/getAllOrder`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const apiUpdateCart = (orderId, foodId, quantity) => {
  let token = localStorage.getItem('token');
  let url = `${baseUrl}/api/v1/food/updateOrder`
  return axios.put(
    url,
    '',
    {
      params: {
        orderId: orderId,
        foodId: foodId,
        quantity: quantity
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}

const apiDeleteCartItem = (orderId, foodId) => {
  let token = localStorage.getItem('token');
  let url = `${baseUrl}/api/v1/food/delete`
  return axios.delete(url, {
    params: {
      orderId: orderId,
      foodId: foodId,
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export { apiGetCart, apiUpdateCart, apiDeleteCartItem }