import React from "react";
import Logo from "../Includes/Logo"
import FooterLinks from "./FooterLinks"
const Footer = () => {
  return (
    <section className="footer-sec  ">
    <div className="footer-sec-inner obj-width1">
        <div className="row d-flex align-items-baseline justify-content-between">
            <div className="ft-sec mb-md-0 mb-sm-4 mb-4 ft-cont-sec col-lg-4 col-md-4 col-sm-12 col-12">
                <Logo/>
                <p className="mt-md-4 mt-sm-2 mt-2 ft-cont-sec">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, nesciunt! Blanditiis,
                    unde et
                    doloribus, distinctio iure consequatur.
                </p>
            </div>
            <FooterLinks/>
        </div>
    </div>
</section>
  )
}

export default React.memo(Footer);
