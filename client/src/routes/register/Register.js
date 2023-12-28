import React, { useEffect, useState } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import {
  checkFullNameError,
  checkEmailError,
  checkPasswordError,
  checkRepeatPasswordError,
  checkAddressError,
  checkAgeError,
  checkPhoneError
} from "../../components/checkInput";
import { color } from "framer-motion";

const Register = ({ activateLoginModal }) => {

  const [formValue, setFormValue] = useState({ id: '', email: '', password: '', repeatPassword: '', fullName: '', address: '', age: '', phone: '', gender: '' });
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [registrationFail, setRegistrationFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmitClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    window.scrollTo(0, 0)

    if (submitCheck(formValue.fullName, checkFullNameError, setFullNameError)
      && submitCheck(formValue.email, checkEmailError, setEmailError)
      && submitCheck(formValue.password, checkPasswordError, setPasswordError)
      && submitCheckRepeatPassword(formValue.password, formValue.repeatPassword, checkRepeatPasswordError, setRepeatPasswordError)
      && submitCheck(formValue.phone, checkPhoneError, setPhoneError)
      && submitCheck(formValue.age, checkAgeError, setAgeError)
      && submitCheck(formValue.address, checkAddressError, setAddressError)) {
      alert('success')
    }
  }

  const submitCheck = (value, check, setError) => {
    let error = check(value);
    if (error !== '') {
      setError(error);
      setLoading(false);
      return false;
    }
    return true;
  }

  const submitCheckRepeatPassword = (oldPass, newPass, check, setError) => {
    let error = check(oldPass, newPass);
    if (error !== '') {
      setError(error);
      setLoading(false);
      return false;
    }
    return true;
  }

  const validateFullName = (e) => {
    let name = e.target.value;
    setFormValue({ ...formValue, fullName: name })
    setFullNameError(checkFullNameError(name));
  }

  const validateEmail = (e) => {
    let email = e.target.value;
    setFormValue({ ...formValue, email: email })
    setEmailError(checkEmailError(email));
  }

  const validatePassword = (e) => {
    let password = e.target.value;
    setFormValue({ ...formValue, password: password })
    setPasswordError(checkPasswordError(password));
  }

  const validateRepeatPassword = (e) => {
    let repeatPassword = e.target.value;
    setFormValue({ ...formValue, repeatPassword: repeatPassword })
    setRepeatPasswordError(checkRepeatPasswordError(formValue.password, repeatPassword));
  }

  const validateAddress = (e) => {
    let address = e.target.value;
    setFormValue({ ...formValue, address: address })
    setAddressError(checkAddressError(address));
  }

  const validateAge = (e) => {
    let age = e.target.value;
    setFormValue({ ...formValue, age: age })
    setAgeError(checkAgeError(age));
  }

  const validatePhone = (e) => {
    let phone = e.target.value.toString();
    setFormValue({ ...formValue, phone: phone })
    setPhoneError(checkPhoneError(phone));
  }

  const handleGenderChange = (e) => {
    let gender = e.target.value;
    setFormValue({ ...formValue, gender: gender })
  }

  useEffect(() => {
    document.title = "Registration | Pizza Time";
  }, []);

  return (
    <main className="register-main">
      <h2>{registerSuccess ? 'Success!' : 'Registration'}</h2>
      {loading ?
        <div role="status" className="loader">
          <p>Almost there...</p>
          <img alt="Processing request" src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
        </div>
        : registerSuccess ?
          <section className="registration-success">
            <p className="form-submit-msg">You can now log in and make an order!</p>
            <button
              className="passive-button-style txt-white"
              onClick={() => {
                ResetLocation()
                activateLoginModal()
              }}
            >
              Log in
            </button>
          </section>
          :
          <form className="registration-form" onSubmit={onSubmitClick}>
            {registrationFail ? <p className="registration-input-err">Seems like this email has already been registered!</p> : null}

            <section className="name-section">
              <input type="text" placeholder="Full name" name="fullname" value={formValue.fullName} onChange={validateFullName} />
              <span className="registration-input-err">{fullNameError}</span>
            </section>

            <section className="email-section">
              <input type="text" placeholder="Email" name="email" value={formValue.email} onChange={validateEmail} />
              <span className="registration-input-err">{emailError}</span>
            </section>

            <section className="password-section">

              <input type="password" placeholder="New password" name="password" value={formValue.password} onChange={validatePassword} />
              <span className="registration-input-err">{passwordError}</span>

              <input type="password" placeholder="Repeat password" name="repeatPassword" value={formValue.repeatPassword} onChange={validateRepeatPassword} />
              <span className="registration-input-err">{repeatPasswordError}</span>

            </section>

            <section className="birthday">
              <input type="tel" placeholder="Phone number" name="number" value={formValue.phone} onChange={validatePhone} />
              <span className="registration-input-err">{phoneError}</span>
            </section>

            <section className="age-and-gender-section">
              <input type="number" placeholder="Age" name="age" value={formValue.age} onChange={validateAge} maxLength={2} />
              <span className="registration-input-err">{ageError}</span>
              <select style={formValue.gender === '' ? { color: 'gray' } : { color: 'white' }}
                value={formValue.gender} onChange={handleGenderChange}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </section>

            <section className="birthday">
              <input type="text" placeholder="Address" name="address" value={formValue.address} onChange={validateAddress} />
              <span className="registration-input-err">{addressError}</span>
            </section>

            <p className="terms-warning">
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
              Policy. You may receive an email notification from us and can opt
              out any time.
            </p>

            <button className="register-btn" type="submit">Sign up</button>
          </form>
      }

    </main>
  );
}


export default Register;