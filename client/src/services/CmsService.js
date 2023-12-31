import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"

export const apiCmsGetContact = (page, limit) => {
  let token = localStorage.getItem('admin_token');
  return axios.get(
    `${baseUrl}/api/v1/contact/all?page=${page}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}