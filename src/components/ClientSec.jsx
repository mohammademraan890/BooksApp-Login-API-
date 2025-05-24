import brand1 from "../assets/client-image1.png";
import brand2 from "../assets/client-image2.png";
import brand3 from "../assets/client-image3.png";
import brand4 from "../assets/client-image4.png";
import brand5 from "../assets/client-image5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
const ClientSec = () => {
  return (
    <section
           className="client-sec mb-5"
    >
      <div
        id="client-carousel"
        className="client-sec-inner obj-width2 d-flex justify-content-center align-items-center"
      >
        <Swiper
          loop={true}
          slidesPerView={5}
          
        >
          <SwiperSlide>
            <a  href="#">
              <img className="img-fluid" src={brand1} alt="" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a  href="#">
              <img className="img-fluid" src={brand2} alt="" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a  href="#">
              <img className="img-fluid" src={brand3} alt="" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a  href="#">
              <img className="img-fluid" src={brand4} alt="" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#">
              <img className="img-fluid" src={brand5} alt="" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#">
              <img className="img-fluid" src={brand2} alt="" />
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default React.memo(ClientSec);
