import React, { useState } from "react";
import LinkButton from "../LinkButton";
import { useNavigate } from "react-router-dom";
import { checkValueLoginError, checkPasswordError } from "../../helpers/checkInput";

const LoginFragment = ({ closeLoginFragment, setValidLogin,
  isLoginBoxOpen, hideMenuBox, validLogin, getUser }) => {
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

  const onSubmitClick = () => {
    // setIsLoading(true);
    console.log("");
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

            <form onSubmit={onSubmitClick()}>
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