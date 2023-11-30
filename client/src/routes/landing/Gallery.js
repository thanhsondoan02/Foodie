import React from 'react'
function Gallery(props) {
  return (
    <article className="gallery flex-container flex-column">
      {props.img375.map((img, index) => (
        <img
          key={index}
          src={img}
          srcSet={` ${props.img700[index]} 700w, ${img} 375w`}
          sizes="(min-width: 700px) 700px, 375px"
          alt={`gallery image ${index}`}
          aria-hidden="true"
        />
      ))}
    </article>
  )
}

export default Gallery
