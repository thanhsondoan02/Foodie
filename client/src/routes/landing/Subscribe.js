import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import validateForm from "../../components/validateForm";
import axios from "axios";

function Subscribe() {
  const baseUrl = "https://29201796-3b03-452f-abee-635c05c2d9cb.mock.pstmn.io"

  const [formValue, setFormValue] = useState({ email: "" })
  const [formError, setFormError] = useState({})
  const [successMsg, setSuccessMsg] = useState("")

  const onSubmitClick = (e) => {
    e.preventDefault()

    const error = validateForm("newsletter")(formValue)

    if (Object.keys(error).length !== 0) {
      setFormError(error)
      setSuccessMsg("")
    } else {
      setFormValue({ email: "" })
      
      // send request to server
      const url = `${baseUrl}/subscribe`
      const bodyRequest = {
        "email": formValue.email
      }
      axios.post(url, bodyRequest)
        .then(res => {
          if (res.data.status === 200) {
            setSuccessMsg(res.data.message)
            setFormError({})
          } else {
            setFormError({ email: res.data.message })
            setSuccessMsg("")
          }
        })
        .catch(err => console.log(err))
    }
  }

  const onEmailInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
  }

  const isSuccessful = () => {
    return Object.keys(formError).length === 0
  }

  return (
    <section className="email-subscribtion">
      <motion.div className="email-label"
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 2 }}
      >
        <label htmlFor="email-input">
          Subscribe to our newsletter to receive updates about menu and enjoy awesome gifts!
        </label>
      </motion.div>
      <motion.div
        className="input-section"
        initial={{ opacity: 0, translateX: 300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
      >
        <form onSubmit={onSubmitClick}>
          <div className="webflow-style-input">
            <input
              name="email"
              onChange={onEmailInputChange}
              value={formValue.email}
              className="input-field"
              placeholder="What's your email?" />
          </div>
          {formError.email ?
            <span className="fullname-error-cpage">
              {formError.email}
            </span>
            : null}
          {successMsg ?
            <span className="fullname-success-cpage">
              {successMsg}
            </span>
            : null}
          <button type="submit" className="active-button-style">
            Sign me up
          </button>
        </form>
      </motion.div>
    </section>
  );
}

export default Subscribe;
