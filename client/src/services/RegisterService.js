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

export { apiRegister }