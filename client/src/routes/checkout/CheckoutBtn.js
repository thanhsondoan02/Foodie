import React from "react";
import LinkButton from "../../components/LinkButton";
import ResetLocation from "../../helpers/ResetLocation";

const CheckoutBtn = ({ validLogin, className, openLoginFragment }) => {
  return (
    <React.Fragment>
      {validLogin ?
        <LinkButton onClick={ResetLocation} to="/checkout" className={className}>
          Checkout
        </LinkButton>
        :
        <button className={className}
          onClick={() => {
            ResetLocation();
            openLoginFragment()
          }}>
          Checkout
        </button>
      }
    </React.Fragment>

  );
}

export default CheckoutBtn;
