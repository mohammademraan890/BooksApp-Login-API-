import { Navigation } from "swiper/modules";
import { heroSliderData } from "../Data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Button from "./Includes/Button";
import React from "react";
import ImageLoader from "./Includes/ImageLoader";

const HeroSlider = () => {
 
  return (
    <section className="hero-slider">
      <Swiper
        id="hero-carousel"
        className=" mySwiper hero-slider-inner d-flex justify-content-center align-items-center"
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
       
        modules={[Navigation]}
      >
        {heroSliderData?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="hero-slide d-flex align-items-md-center obj-width1 justify-content-md-between flex-md-row flex-sm-column flex-column hero-slide1">
                <div className="hero-cont text-center text-md-start">
                  <h1>{item.title} </h1>
                  <p>{item.desc}</p>
                 <Button text={"Read More"}/>
                </div>
                <div className="hero-img mt-md-0 mt-sm-3 mt-3">
                  <ImageLoader src={item.img}/>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button className="custom-prev">
        <i className="bx bx-left-arrow-alt"></i>
      </button>
      <button className="custom-next">
      <i className="bx bx-right-arrow-alt"></i>

      </button>
    </section>
  );
};

export default React.memo(HeroSlider);
