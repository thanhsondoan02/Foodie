import React from "react";

const NotLoginCart = ({ openLoginFragment }) => {
  return (
    <React.Fragment>
      <h3>You have not login yet</h3>
      <p>Please login to view your cart</p>
      <button className="active-button-style"
        onClick={() => { openLoginFragment(); }}
      >
        Login
      </button>
    </React.Fragment>
  );
}

export default NotLoginCart;
