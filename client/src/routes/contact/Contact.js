import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { apiSendContact } from "../../services/MenuService";
import { toastError, toastSuccess } from "../../helpers/toastHelper";
import { checkContactMessageError, checkEmailError, checkFullNameError } from "../../helpers/checkInput";

const Contact = () => {
  const [formValue, setFormValue] = useState({ fullName: '', email: '', message: "" });
  const [loading, setLoading] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const onSubmitClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (submitCheck(formValue.fullName, checkFullNameError, setFullNameError, document.querySelector('#contactFullName'))
      && submitCheck(formValue.email, checkEmailError, setEmailError, document.querySelector('#contactEmail'))
      && submitCheck(formValue.message, checkContactMessageError, setMessageError, document.querySelector('#contactMessage'))) {
      resetForm();
      try {
        const response = await apiSendContact(formValue.fullName, formValue.email, formValue.message);
        if (response.data.EC === 0) {
          setLoading(false);
          toastSuccess("Your contact has been sent successfully!");
        } else {
          setLoading(false);
          console.log(response.data.EM);
          toastError(response.data.EM);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        toastError(err.message);
      }
    }
  }

  const resetForm = () => {
    setFormValue({ fullName: '', email: '', message: "" });
    setFullNameError("");
    setEmailError("");
    setMessageError("");
  }

  const submitCheck = (value, check, setError, element) => {
    let error = check(value);
    if (error !== '') {
      setError(error);
      setLoading(false);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  const validateFullName = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, fullName: value })
    setFullNameError(checkFullNameError(value));
  }

  const validateEmail = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, email: value })
    setEmailError(checkEmailError(value));
  }

  const validateMessage = (e) => {
    let value = e.target.value;
    setFormValue({ ...formValue, message: value })
    setMessageError(checkContactMessageError(value));
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Contact Us";
  }, []);

  return (
    <motion.main className="contact" initial={{ opacity: 0, translateX: -300 }}
      whileInView={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: -300 }}
      transition={{ duration: 1 }}>
      {loading ?
        <section className="contact-loader">
          <p>Almost there...</p>
          <img alt="Processing request" src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
        </section>
        :
        <form onSubmit={onSubmitClick} className="flex-container flex-column">

          <div className="webflow-style-input" id="contactFullName">
            <input onChange={validateFullName} value={formValue.fullName} name="fullName"
              className="pop-font" type="text" placeholder="Full Name" />
          </div>
          <span className="input-validation-error">{fullNameError}</span>

          <div className="webflow-style-input" id="contactEmail">
            <input onChange={validateEmail} value={formValue.email} name="email"
              className="pop-font" type="text" placeholder="Email" />
          </div>
          <span className="input-validation-error">{emailError}</span>

          <div className="webflow-style-input" id="contactMessage">
            <textarea onChange={validateMessage} value={formValue.message}
              name="message" className="pop-font" placeholder="Message" />
          </div>

          <span className="input-validation-error">{messageError}</span>
          <button type="submit" className="active-button-style" >
            Send
          </button>
        </form>
      }
      <section className="contact-us-img"></section>
      <section className="contact-us-content pop-font">
        <section className="contact-us-content-txt">
          <h2 className="">Contact us</h2>
          <p>
            We greatly anticipate your response and are eager to receive any inquiries you might have. Please do not hesitate to reach out to us should you require any further clarification or assistance. Your feedback and questions are of utmost importance to us, and we are here to provide the support you need. Looking forward to hearing from you!
          </p>
        </section>
      </section>
    </motion.main>
  );
}


export default Contact;