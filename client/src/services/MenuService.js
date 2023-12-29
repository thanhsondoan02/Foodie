import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"
const itemPerPage = 5;

const apiGetCategories = () => {
  return axios.get(`${baseUrl}/api/v1/food/category`);
}

const apiGetProducts = (page, category) => {
  let url = category === "All"
    ? `${baseUrl}/api/v1/food/getAll?page=${page}&limit=${itemPerPage}`
    : `${baseUrl}/api/v1/food/getAll?page=${page}&limit=${itemPerPage}&category=${category}`
  return axios.get(url)
}

export { apiGetCategories, apiGetProducts }