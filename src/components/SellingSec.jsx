import React from "react";
import sellImg from "../../assets/asset 12.jpeg";
const SellingSec = () => {
  return (
    <section className="selling-sec py-lg-5 py-md-4 py-sm-3 py-3 px-sm-4 mt-md-5">
    <div className="selling-sec-inner obj-width2 my-lg-5 my-md-5 my-sm-3 my-3">
        <div
            className="row d-flex justify-content-center align-items-center flex-md-row flex-sm-column flex-column text-center">
            <div data-aos="fade-right" data-aos-duration="700"
                className="selling-img col-md-6 col-sm-12 d-flex justify-content-center">
                <img style={{width: "fit-content", height: "fit-content"}} className="img-fluid sell-img"
                    src={sellImg} alt="" />
            </div>
            <div data-aos="fade-left" data-aos-duration="1100"
                className="selling-cont col-md-6 col-sm-12 text-center text-md-start">
                <h2 className="mb-lg-5 mb-md-4 mb-4 mt-md-0 mt-sm-2 mt-2">Best Selling Book</h2>
                <p>By Timbur Hood</p>
                <p className="sell-head text-capitalize mt-md-2 mt-1 mb-3 lh-1">Birders gonna be happy</p>
                <p className="mt-md-4 mb-md-4 my-sm-2 ">Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit.
                    Vero
                    distinctio vel voluptatem
                </p>
                <span className="sell-price mt-md-2 mt-2">$ 45.00</span>
                <div className=" mt-md-5 mt-sm-3 mt-1">
                    <a href="#" className=" sell-btn simplebtn">Shop it Now <span className="fs-5 fw-bolder ms-1 ">&rarr;</span></a>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default React.memo(SellingSec);
