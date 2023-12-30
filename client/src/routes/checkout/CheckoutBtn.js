import React from "react";
// import LinkButton from "../../components/LinkButton";
import ResetLocation from "../../helpers/ResetLocation";

const CheckoutBtn = ({ validLogin, className, openLoginFragment, onOrderClick }) => {
  return (
    <React.Fragment>
      {validLogin ?
        <button onClick={() => {
          ResetLocation()
          onOrderClick()
        }} 
          className={className}>
          Order now
        </button>
        :
        <button className={className}
          onClick={() => {
            ResetLocation();
            openLoginFragment()
          }}>
          Order now
        </button>
      }
    </React.Fragment>

  );
}

export default CheckoutBtn;
