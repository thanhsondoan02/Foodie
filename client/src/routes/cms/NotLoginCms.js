import React from "react";

const NotLoginCms = ({ openLoginFragment }) => {
  return (
    <React.Fragment>
      <div className="not-login-cms">
        <h3>You have not login yet</h3>
        <p>Please login to use our CMS</p>
        <button className="active-button-style"
          onClick={() => { openLoginFragment(); }}
        >
          Login
        </button>
      </div>
    </React.Fragment>
  );
}

export default NotLoginCms;
