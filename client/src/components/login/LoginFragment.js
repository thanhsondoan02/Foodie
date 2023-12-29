import React, { useState } from "react";
import LinkButton from "../LinkButton";
import { useNavigate } from "react-router-dom";
import { checkValueLoginError, checkPasswordError } from "../../helpers/checkInput";
import { apiLogin } from "../../services/RegisterService";

const LoginFragment = ({ closeLoginFragment, isLoginBoxOpen, hideMenuBox,
  validateToken }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ valueLogin: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [valueLoginError, setValueLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const validateValueLogin = (e) => {
    let valueLogin = e.target.value;
    setFormValue({ ...formValue, valueLogin: valueLogin })
    setValueLoginError(checkValueLoginError(valueLogin));
  }

  const validatePassword = (e) => {
    let password = e.target.value;
    setFormValue({ ...formValue, password: password })
    setPasswordError(checkPasswordError(password));
  }

  const resetFragment = () => {
    setFormValue({ valueLogin: '', password: '' });
    setIsLoading(false);
    setValueLoginError('');
    setPasswordError('');
    setServerError('');
  }

  const onCloseClick = () => {
    closeLoginFragment()
    resetFragment()
  }

  const submitCheck = (value, check, setError) => {
    let error = check(value);
    if (error !== '') {
      setError(error);
      setIsLoading(false);
      return false;
    }
    return true;
  }

  const onSubmitClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError('');

    if (submitCheck(formValue.valueLogin, checkValueLoginError, setValueLoginError)
      && submitCheck(formValue.password, checkPasswordError, setPasswordError)) {
      try {
        const response = await apiLogin(formValue.valueLogin, formValue.password);
        if (response.data.EC === 0) {
          closeLoginFragment();
          resetFragment();
          navigate('/');
          localStorage.setItem('token', response.data.DT.access_token);
          validateToken()
          // sessionStorage.setItem('info', {
          //   id: response.data.DT.id,
          //   email: response.data.DT.email,
          //   fullName: response.data.DT.fullName,
          //   age: response.data.DT.age,
          //   address: response.data.DT.address,
          //   phone: response.data.DT.phone,
          //   gender: response.data.DT.gender
          // });
        } else {
          console.log(response.data.EM);
          setIsLoading(false);
          setServerError(response.data.EM);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setServerError(err);
      }
    }
  }

  return (
    <article className={`modal ${isLoginBoxOpen ? "active-modal" : null}`}>
      <section className="modal-main">

        <button className="close-modal-btn" type="button"
          onClick={() => { onCloseClick(); }}>
          X
        </button>

        <section className="modal-content">

          <h2>Log in</h2>

          {isLoading ?

            <div role="status" className="login-loader">
              <p>Almost there...</p>
              <img alt="Processing request" src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
            </div> :

            <form onSubmit={onSubmitClick}>
              <input onChange={validateValueLogin} value={formValue.valueLogin} name="valueLogin" type="text" placeholder="Email or phone number" />
              <span className="login-input-err">{valueLoginError}</span>

              <input onChange={validatePassword} value={formValue.password} name="password" type="password" placeholder="Password" />
              <span className="login-input-err">{passwordError}</span>

              {serverError !== "" ?
                <p className="login-input-err">Error: {serverError}</p>
                : null}

              <section className="login-and-signup">
                <LinkButton
                  onClick={() => {
                    onCloseClick();
                    hideMenuBox();
                  }}
                  to="/register" className="modal-signup-btn">
                  Sign up
                </LinkButton>
                <button type="submit" className="modal-login-btn">Log in</button>
              </section>
            </form>}
        </section>
      </section>
    </article>
  )
}

export default LoginFragment;