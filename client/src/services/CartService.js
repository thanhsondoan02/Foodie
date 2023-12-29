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

export { apiGetCart }