import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { QuotesData } from "../Data";
import React from "react";
const Quotes = () => {
  return (
    <section className="quote-sec my-lg-5 my-md-4 mt-sm-3 mb-sm-2 my-2">
      <div className="quote-sec-inner obj-width2 text-center">
        <h2
        
          className="text-capitalize"
        >
          Quotes Of the day
        </h2>
        <div id="quote-slider">
          <Swiper grabCursor={true} loop={true}>
            {QuotesData.map((item) => {
              return (
                <SwiperSlide key={item.id}> 
                  <div
                    className="quote"
                  >
                    <p className="quote my-lg-4 my-md-4 my-sm-3 my-2">
                     {item.quote}
                    </p>
                    <span>{item.writer}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Quotes);
