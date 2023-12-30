import React, { useEffect, useState } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../helpers/toastHelper";
import "./profile2.css"
import { apiGetProfile, apiUpdateProfile } from "../../services/AccountService";
import { checkAddressError, checkAgeError, checkFullNameError, checkGenderError, checkPhoneError } from "../../helpers/checkInput";


const Profile = ({ isValidLogin }) => {
  const [formValue, setFormValue] = useState({ email: '', fullName: '', address: '', age: '', phone: '', gender: ''});
  const [userId, setUserId] = useState('');

  const validateFullName = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, fullName: value })
  }

  const validateAge = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, age: value })
  }

  const validateAddress = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, address: value })
  }

  const validateGender = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, gender: value })
  }

  const validatePhone = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, phone: value })
  }

  const getProfileServer = async () => {
    try {
      const response = await apiGetProfile();
      if (response.data.EC === 0) {
        let newGender = response.data.DT.gender === "Female" ? "Female" : "Male"
        setUserId(6)
        let newFormValue = {
          email: response.data.DT.email,
          fullName: response.data.DT.fullName,
          age: response.data.DT.age,
          phone: response.data.DT.phone,
          address: response.data.DT.address,
          gender: newGender
        }
        setFormValue(newFormValue);
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  const updateProfileServer = async () => {
    try {
      const response = await
        apiUpdateProfile(userId, formValue.fullName, formValue.age,
          formValue.address, formValue.gender, formValue.phone);
      if (response.data.EC === 0) {
        toastSuccess("Update profile successfully");
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  }

  const onSubmitClick = async (e) => {
    e.preventDefault();

    if (checkFullNameError(formValue.fullName) !== '') {
      toastError(checkFullNameError(formValue.fullName));
      return;
    }
    if (checkAgeError(formValue.age) !== '') {
      toastError(checkAgeError(formValue.age));
      return;
    }
    if (checkAddressError(formValue.address) !== '') {
      toastError(checkAddressError(formValue.address));
      return;
    }
    if (checkPhoneError(formValue.phone) !== '') {
      toastError(checkPhoneError(formValue.phone));
      return;
    }

    updateProfileServer();
  }

  useEffect(() => {
    document.title = "Profile | Foodie Pizza";
    getProfileServer();
  }, []);

  return (
    <main className="profile">
      <div className="profile-div-container">
        {isValidLogin ?
          <form id="container" onSubmit={onSubmitClick}>
            <h3 id="Heading">Profile</h3>

            <label>Email:</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
              <input disabled={true} type="email" placeholder="Email"
                name="email" value={formValue.email} required />
            </div>

            <label>Full Name:</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
              <input name="fullName" type="text" placeholder="Username"
                value={formValue.fullName} onChange={validateFullName} required />
            </div>

            <label>Age:</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                </svg>
              </div>
              <input type="number" placeholder="Age" name="age"
                value={formValue.age} onChange={validateAge} required />
            </div>

            <label>Phone Number</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px">
                  <path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z" />
                </svg>
              </div>
              <input type="tel" placeholder="Phone Number" name="phone"
                value={formValue.phone} onChange={validatePhone} required />
            </div>

            <label>Gender</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                </svg>
              </div>
              <select value={formValue.gender} onChange={validateGender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <label>Address</label>
            <div className="row">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px">
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                </svg>
              </div>
              <input type="text" placeholder="Address" name="address"
                value={formValue.address} onChange={validateAddress} required />
            </div>

            <button type="submit">Save</button>
          </form>
          :
          null
        }
      </div>
    </main>
  )
}



export default Profile;