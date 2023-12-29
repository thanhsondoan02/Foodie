import React from "react";
//components
import LinkButton from "../../components/Button";
import ResetLocation from "../../helpers/ResetLocation";

const CheckoutBtn = ({ className, openLoginFragment }) => {
  let validLogin = true
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
