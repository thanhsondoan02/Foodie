import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"
const itemPerPage = 3;

const apiGetBlogList = (page) => {
  return axios.get(`${baseUrl}/api/v1/blog/get?page=${page}&limit=${itemPerPage}`)
}

const apiGetBlog = (blogId) => {
  return axios.get(`${baseUrl}/api/v1/blog/get?id=${blogId}`)
}

export { apiGetBlogList, apiGetBlog}