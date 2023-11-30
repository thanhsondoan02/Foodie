import React from "react";

function MenuSliderCategory(props) {
  return (
    <li>
      <button onClick={() => {
        props.changeCategory(props.category.id)
      }}>
        {props.category.name}
      </button>
    </li>
  )
}

export default MenuSliderCategory