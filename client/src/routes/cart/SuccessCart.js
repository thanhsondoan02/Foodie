import React from "react";
import LinkButton from "../../components/LinkButton";
import resetLocation from "../../helpers/ResetLocation";

const SuccessCart = ({ openLoginFragment }) => {
  return (
    <React.Fragment>
      <h3>Ordered successfully!</h3>
      <p>Check your history or back to menu and continue ordering</p>

      <section className="cart-interaction-btns">
        <LinkButton className="active-button-style"
          to="/history" onClick={resetLocation}
        >
          Order history
        </LinkButton>
        <LinkButton
          onClick={resetLocation}
          to="/menu"
          className="back-to-menu"
        >
          Back to menu
        </LinkButton>
      </section>
    </React.Fragment>
  );
}

export default SuccessCart;
