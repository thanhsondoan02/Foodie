import axios from "axios";

const baseUrl = "http://fall2324w20g2.int3306.freeddns.org"

const apiRegister = (email, password, fullName, address, age, phone, gender) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('fullName', fullName);
  formData.append('age', age);
  formData.append('address', address);
  formData.append('gender', gender);
  formData.append('phone', phone);

  return axios.post(`${baseUrl}/api/v1/register`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

const apiLogin = (valueLogin, password) => {
  return axios.post(`${baseUrl}/api/v1/login`,
    {
      'valueLogin': valueLogin,
      'password': password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

const apiLogout = () => {
  return axios.get(`${baseUrl}/api/v1/logout`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export { apiRegister, apiLogin, apiLogout }