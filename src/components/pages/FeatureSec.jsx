import ProductCard from "../Includes/ProductCard";
import Heading1 from "../Includes/Heading1";
import React, {useEffect } from "react";
import { BooksArr } from "../../Data";
const FeatureSec = () => {
  useEffect(()=>{
    document.title="Features || BookSaw"
  },[])
  return (
    <>
      <Heading1 title={"Featured books"} desc={"some quality items"} />

      <section
        data-aos="fade-up"
        data-aos-duration="1100"
        className="featured-sec mb-md-4 mb-sm-3 mb-3"
      >
        <div className="featured-sec-inner obj-width1">
          <div className="row">
            {BooksArr?.slice(0,4)?.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  author={item.author}
                  price={item.price}
                  img={item.img}
                />
              );
            })}
          </div>
        </div>
        <div className="obj-width1">
          <a href="/" className="simplebtn text-capitalize feature-btn">
            view all products{" "}
            <span className="fs-5 fw-bolder ms-1 ">&rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default React.memo(FeatureSec);
