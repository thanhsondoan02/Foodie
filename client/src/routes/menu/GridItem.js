import React from 'react';
import { Link } from 'react-router-dom';
import ResetLocation from "../../helpers/ResetLocation";
import AddToCartButton from '../cart/AddToCartButton';

const GridItem = ({ singleProduct, onAddCartClick }) => {
  return (
    <article className="menu-grid-item flex-container flex-column txt-white">
      <Link onClick={ResetLocation} to={`/menu/${singleProduct.id}`} className="menu-item-link">
        <img src={singleProduct.ItemImg} alt={`${singleProduct.ItemName}`} />
      </Link>
      <h3>{singleProduct.ItemName}</h3>
      <p>{singleProduct.ItemIngredients}</p>
      <div className="price">
        {singleProduct.sale === true ?
          <section className="sale-pricing">
            <p className="price-num-before"><span>$</span>{singleProduct.ItemPriceBefore}</p>
            <p className="price-num"><span>$</span>{singleProduct.ItemPrice}</p>
          </section>
          :
          <p className="price-num"><span>$</span>{singleProduct.ItemPrice}</p>
        }
        <AddToCartButton
          product={singleProduct}
          onAddCartClick={onAddCartClick}
        />
      </div>
    </article>
  );
};

export default GridItem;
