import React, { useEffect } from "react";
import { ArticlesData } from "../../Data";
import Heading1 from "../Includes/Heading1";
import SocialLinks from "../Includes/SocialLinks";
const ArticlesSec = () => {
  useEffect(()=>{
    document.title="Articles || BookSaw"
  },[])
  return (
    <>
    <Heading1 title={"Latest Articles"} desc="read our articles"/>
    <section
      data-aos="fade-up"
      data-aos-duration="1100"
      className="articles-sec mb-lg-5 mb-md-5 mb-sm-3 mb-2 px-2"
    >
      <div className="article-sec-inner obj-width1">
        <div className="row">
            {ArticlesData?.map((item) => {
                return(
                    <div key={item.id} className="article col-lg-4 col-md-4 col-sm-6 col-12 mb-md-0 mb-sm-4 mb-4">
                    <div className="article-img mb-lg-4 mb-md-3 mb-sm-2 mb-2">
                      <img
                        className="img-fluid"
                        src={item.img}
                        alt=""
                      />
                    </div>
                    <span className="article-date">{item.date}</span>
                    <p className="article-txt">
                    {item.desc}
                    </p>
                    <div className="article-links d-flex justify-content-between align-items-center">
                      <p className="text-uppercase">inspiration</p>
                      <SocialLinks/>
                    </div>
                  </div>
                )
            })}
         
        </div>
        <a
          href="#"
          className="simplebtn mx-auto mt-lg-5 mt-md-4 mt-sm-2 mt-1"
          style={{ width: "fit-content"}}
          
        >
          REad all articles <i className="fa-solid fa-arrow-right-long"></i>
        </a>
      </div>
    </section>
    </>
  );
};

export default React.memo(ArticlesSec);
