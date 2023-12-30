import React from "react";

const AddToCartButton = ({ product, onAddCartClick }) => {
  return (
    <button
      onClick={() => {
        onAddCartClick(product)
      }}
      className={`passive-button-style 
      ${true ? "active-add-to-cart" : "inactive-add-to-cart"}`}
    // disabled={targetAttribute?.length > 0 || singleProduct?.attributes?.length === 0 ? false : true}
    >
      Add to cart
    </button>
  );
}
export default AddToCartButton;