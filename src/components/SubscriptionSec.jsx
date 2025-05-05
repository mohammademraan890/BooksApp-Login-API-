import React from "react";
import "./SubscriptionSec.css"
const SubscriptionSec = () => {
  return (
    <div>
      <section className="subscribe-sec my-lg-5 my-md-5 my-sm-3 my-2 d-flex justify-content-center align-items-center">
                <div className="sub-sec-inner obj-width2 row">
                    <div data-aos="fade-right" data-aos-duration="700" className="sub-head col-md-6 col-sm-12 col-12">
                        <h1 className="text-capitalize">Subscribe to our newsletter</h1>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="1100" className="sub-cont col-md-6 col-sm-12 col-12">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum corrupti veritatis dolorem
                            ex.
                            onsectetur adipisicing elit</p>
                        <div className="sub-form">
                            <input id="sub-inp" type="text" placeholder="Enter your email address here"/>
                            <div className="inp-btns">
                                <input id="sub-btn" type="button" value="Send"/>
                                <a id="sub-link" href="#"><i className='bx bxl-telegram'></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
    </div>
  )
}

export default React.memo(SubscriptionSec);
