import { useEffect, useState } from "react";
import NotLoginCms from "../NotLoginCms";
import { apiCmsSendMail } from "../../../services/CmsService";
import { toastError, toastSuccess } from "../../../helpers/toastHelper";
import { Loading } from "../Loading";

export default function MailCms({ isValidAdmin, openLoginFragment }) {
  const [isLoading, setIsLoading] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    document.title = "Foodie Restaurant | Mail CMS";
    setIsLoading(false);
    setMessageBody("");
  }, [isValidAdmin]);

  const sendMailServer = async () => {
    setIsLoading(true);
    try {
      const response = await apiCmsSendMail(messageBody);
      if (response.data.EC === 0) {
        toastSuccess("Send mail successfully");
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
        :
        isLoading ?
          <Loading message={"Your mail is sending..."} />
          :
          <main className='contact-cms-main'>
            <h2 className="contact-cms-header">Send email to all contacts</h2>
            <div className='mail-cms-container'>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="mail-html-input"
                placeholder="Enter your email body (can be HTML) here..."
              />
              <button className="active-button-style"
                onClick={() => { sendMailServer() }}
              >
                Send
              </button>
            </div>
          </main>
      }
    </>
  )

}