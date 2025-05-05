import React, { useEffect } from "react";
import mobileImg from "../../assets/asset 28.png"
import download1 from "../../assets/asset 29.jpeg"
import download2 from "../../assets/asset 30.jpeg"
const DownloadSec = () => {
  useEffect(()=>{
    document.title="Download App || BookSaw"
  },[])
  return (
    <>
    <section className="download-sec ">
      <div className="down-sec-inner obj-width2">
        <div className="row d-flex align-items-center flex-md-row flex-sm-column-reverse flex-column-reverse">
          <div
            data-aos="fade-right"
            data-aos-duration="700"
            className="down-img col-md-5 col-sm-12 col-12 mt-md-0 mt-sm-3 mt-3 "
          >
            <div className="d-flex justify-content-center">
              <div className="beforeafterdefault">
                <div data-type="data-type-image">
                  <div data-type="before">
                    <img src={mobileImg} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1100"
            className="down-cont col-md-7 col-sm-12 col-12 text-center text-md-start"
          >
            <h1>Download Our App Now !</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quae odit cum est blanditiis ullam voluptatum ipsam
              provident repellendus!
            </p>
            <div className="down-img-bottom d-flex justify-content-md-start justify-content-sm-center justify-content-center">
              <a href="#">
                <img src={download1} alt="" />
              </a>
              <a href="#">
                <img src={download2} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default React.memo(DownloadSec);
