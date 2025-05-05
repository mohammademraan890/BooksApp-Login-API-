import React from "react";

const Heading1 = ({desc,title}) => {
  return (
    <section data-aos="fade-up" data-aos-duration="700" className="common-sec">
      <div className="common-sec-inner text-center  obj-width1">
        <p className="text-uppercase">{desc}</p>
        <div className="arrow-head">
          <h1 className="text-capitalize  mt-sm-2 ">{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Heading1);
