import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../helpers/toastHelper";
import "./profile.css"
import { apiGetProfile, apiUpdateProfile } from "../../services/AccountService";
import { checkAddressError, checkAgeError, checkFullNameError, checkPhoneError } from "../../helpers/checkInput";
import { ReactComponent as EmailIcon } from "../../assets/email-icon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/phone-icon.svg";
import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { ReactComponent as GenderIcon } from "../../assets/gender-icon.svg";
import { ReactComponent as AddressIcon } from "../../assets/address-icon.svg";
import { ReactComponent as AgeIcon } from "../../assets/age-icon.svg";

const Profile = ({ isValidLogin }) => {
  const [formValue, setFormValue] = useState({ email: '', fullName: '', address: '', age: '', phone: '', gender: '' });
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
        setUserId(response.data.DT.id);
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
      toastError(err.message);
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
      toastError(err.message);
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
      {isValidLogin ?
        <form id="container" onSubmit={onSubmitClick}>
          <h3 id="Heading">Profile</h3>

          <label>Email:</label>
          <div className="row">
            <div className="icon">
              <EmailIcon />
            </div>
            <input disabled={true} type="email" placeholder="Email"
              name="email" value={formValue.email} required />
          </div>

          <label>Full Name:</label>
          <div className="row">
            <div className="icon">
              <UserIcon />
            </div>
            <input name="fullName" type="text" placeholder="Username"
              value={formValue.fullName} onChange={validateFullName} required />
          </div>

          <label>Age:</label>
          <div className="row">
            <div className="icon">
              <AgeIcon />
            </div>
            <input type="number" placeholder="Age" name="age"
              value={formValue.age} onChange={validateAge} required />
          </div>

          <label>Phone Number</label>
          <div className="row">
            <div className="icon">
              <PhoneIcon />
            </div>
            <input type="tel" placeholder="Phone Number" name="phone"
              value={formValue.phone} onChange={validatePhone} required />
          </div>

          <label>Gender</label>
          <div className="row">
            <div className="icon">
              <GenderIcon />
            </div>
            <select value={formValue.gender} onChange={validateGender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <label>Address</label>
          <div className="row">
            <div className="icon">
              <AddressIcon />
            </div>
            <input type="text" placeholder="Address" name="address"
              value={formValue.address} onChange={validateAddress} required />
          </div>

          <button type="submit">Save</button>
        </form>
        :
        null
      }
    </main>
  )
}



export default Profile;