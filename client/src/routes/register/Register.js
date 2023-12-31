import React, { useEffect, useState } from "react";
import ResetLocation from "../../helpers/ResetLocation";
import {
  checkFullNameError,
  checkEmailError,
  checkPasswordError,
  checkRepeatPasswordError,
  checkAddressError,
  checkAgeError,
  // checkPhoneError,
  checkGenderError
} from "../../helpers/checkInput";
import { apiRegister } from "../../services/AccountService";

const Register = ({ openLoginFragment }) => {

  const [formValue, setFormValue] = useState({ email: '', password: '', repeatPassword: '', fullName: '', address: '', age: '', phone: '', gender: '' });
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [registrationFail, setRegistrationFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const checkPhoneError = (phone) => {
    let phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phone) {
      return ('Please enter your phone number');
    } else if (!phoneRegex.test(phone)) {
      return ('Please enter a valid phone number');
    } else {
      return ('');
    }
  }

  const onSubmitClick = async (e) => {
    window.scrollTo(0, 0);
    setRegistrationFail(false);
    setLoading(true);
    e.preventDefault();

    if (submitCheck(formValue.fullName, checkFullNameError, setFullNameError, document.querySelector('.name-section'))
      && submitCheck(formValue.email, checkEmailError, setEmailError, document.querySelector('.email-section'))
      && submitCheck(formValue.password, checkPasswordError, setPasswordError, document.querySelector('.password-section'))
      && submitCheckRepeatPassword(formValue.password, formValue.repeatPassword, checkRepeatPasswordError, setRepeatPasswordError)
      && submitCheckPhone()
      && submitCheck(formValue.age, checkAgeError, setAgeError, document.querySelector('.age-section'))
      && submitCheck(formValue.gender, checkGenderError, setGenderError, document.querySelector('.gender-section'))
      && submitCheck(formValue.address, checkAddressError, setAddressError, document.querySelector('.address-section'))) {
      try {
        const response = await apiRegister(
          formValue.email, formValue.password, formValue.fullName,
          formValue.address, formValue.age, formValue.phone, formValue.gender)
        if (response.data.EC === 0) {
          setLoading(false);
          setRegisterSuccess(true);
          window.scrollTo(0, 0);
        } else {
          console.log(response.data.EM);
          setLoading(false);
          setRegistrationFail(true);
          window.scrollTo(0, 0);
          setServerError(response.data.EM);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
        setRegistrationFail(true);
        window.scrollTo(0, 0);
        setServerError(err.message);
      }
    }
  }

  const submitCheck = (value, check, setError, element) => {
    let error = check(value.toString());
    if (error !== '') {
      setError(error);
      setLoading(false);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  const submitCheckPhone = () => {
    let error = checkPhoneError(formValue.phone)
    console.log(formValue.phone, checkPhoneError(formValue.phone))
    setPhoneError(error);
    if (error === '') {
      return true;
    } else {
      setLoading(false);
      document.querySelector('.phone-section')
        .scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
  }

  const submitCheckRepeatPassword = (oldPass, newPass, check, setError) => {
    let error = check(oldPass, newPass);
    if (error !== '') {
      setError(error);
      setLoading(false);
      document.querySelector('.password-section')
        .scrollIntoView({ behavior: "smooth", block: "center" });
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

  const validateGender = (e) => {
    let gender = e.target.value;
    setFormValue({ ...formValue, gender: gender })
    setGenderError(checkGenderError(gender))
  }

  const validatePhone = (e) => {
    let phone = e.target.value.toString();
    setFormValue({ ...formValue, phone: phone })
    setPhoneError(checkPhoneError(phone));
    console.log(phone, checkPhoneError(phone))
  }

  useEffect(() => {
    document.title = "Registration | Foodie";
  }, []);

  return (
    <main className="register-main">
      <h2 className="normal-header">{registerSuccess ? null : 'Registration'}</h2>
      {loading ?
        <div role="status" className="loader">
          <p>Almost there...</p>
          <img alt="Processing request" src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
        </div>
        : registerSuccess ?
          <div className="registration-success">
            <div>
              <i class="check-mark">✓</i>
            </div>
            <h2 className="success-header">Success</h2>
            <p className="form-submit-msg">You can now log in and make an order!</p>
            <button
              className="passive-button-style txt-white"
              onClick={() => {
                ResetLocation()
                openLoginFragment()
              }}
            >
              Log in
            </button>
          </div>
          :
          <form className="registration-form" onSubmit={onSubmitClick}>
            {registrationFail ? <p className="registration-input-err">Error: {serverError}</p> : null}

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

            <section className="phone-section">
              <input type="tel" placeholder="Phone number" name="number" value={formValue.phone} onChange={validatePhone} />
              <span className="registration-input-err">{phoneError}</span>
            </section>

            <section className="age-section">
              <input type="number" placeholder="Age" name="age" value={formValue.age} onChange={validateAge} maxLength={2} />
              <span className="registration-input-err">{ageError}</span>
            </section>

            <section className="gender-section">
              <select style={formValue.gender === '' ? { color: 'gray' } : { color: 'white' }}
                value={formValue.gender} onChange={validateGender}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className="registration-input-err">{genderError}</span>
            </section>

            <section className="address-section">
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