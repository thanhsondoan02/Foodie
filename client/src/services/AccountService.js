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

const apiGetProfile = () => {
  let token = localStorage.getItem('token');
  return axios.get(`${baseUrl}/api/v1/user/read`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const apiUpdateProfile = (id, fullName, age, address, gender, phone) => {
  let token = localStorage.getItem('token');
  return axios.put(`${baseUrl}/api/v1/user/update`,
    new URLSearchParams({
      'id': id,
      'fullName': fullName,
      'age': age,
      'address': address,
      'gender': gender,
      'phone': phone
    }),
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
}

export const apiOrderHistory = (page, limit) => {
  let token = localStorage.getItem('token');
  return axios.get(`${baseUrl}/api/v1/order/history?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


export { apiRegister, apiLogin, apiLogout, apiGetProfile, apiUpdateProfile }