import React from "react";
import ImageLoader from "./ImageLoader";
const ProductCard = ({
  id,
  title,
  author,
  price,
  img,
  link = "",
  prevPrice = "",
  showDiscout = false,
}) => {


  return (
    <div className="feature col-md-3 col-sm-6 col-6">
      <div className="feature-img feature-img-hover text-center">
        <div className="offer-img">

          <div className="imageborder">
            {/* <img className="img-fluid" loading="lazy"  src={img} alt="image" /> */}
            <ImageLoader src={img} link={link} />
          </div>


          <div className="offer-hover">
            <button
              className={`m-0 w-100 h-100`}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="feature-cont mt-lg-4 mt-md-3 mt-sm-2 mt-1 mb-sm-4 mb-4">
          <a href="#" className="feature-head">
            {title}
          </a>
          <p>{author}</p>
          <span className="d-flex justify-content-center align-items-baseline">
            {showDiscout && <p className="offer-price">${prevPrice}.00 </p>}$
            {price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
