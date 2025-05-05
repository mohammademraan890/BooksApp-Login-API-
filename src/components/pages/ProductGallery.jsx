import React, { useEffect, useState } from "react"
import { galleryData } from "../../Data"
import Heading1 from "../Includes/Heading1"
import ProductCard from "../Includes/ProductCard"
const ProductGallery = () => {
    
    const [activeProduct, setActiveProduct] = useState("all")
    const handleActive = (e)=>{
        setActiveProduct(e.target.dataset.category)
        console.log(e.target.dataset.category)
    }
    useEffect(()=>{
        document.title="Gallery || BookSaw"
      },[])
    // console.log(setCartProducts, typeof setCartProducts)
  return (
    <>
    <Heading1 title={"popular books"} desc={"some quality items"} />
    <section data-aos="fade-up" data-aos-duration="1100" className="gallery-sec">
    <div className="gallery-sec-inner obj-width1">
        <div className="wrap">

            <div className="gallery-wrap">

                <ul id="filters" className="clearfix">
                    <li><span  onClick={handleActive} id="first-li" className={ ` filter ${activeProduct ==="all" ? "active" : ""}  `}
                           data-category="all">All
                            Genre</span></li>
                    <li><span  onClick={handleActive} className={ ` filter ${activeProduct ==="business" ? "active" : ""}  `}  data-category="business">Business</span></li>
                    <li><span  onClick={handleActive} className={ ` filter ${activeProduct ==="technology" ? "active" : ""}  `}  data-category="technology">Technology</span></li>
                    <li><span  onClick={handleActive} className={ ` filter ${activeProduct ==="romantic" ? "active" : ""}  `}  data-category="romantic">Romantic</span></li>
                    <li><span  onClick={handleActive} className={ ` filter ${activeProduct ==="adventure" ? "active" : ""}  `}  data-category="adventure">Adventure</span></li>
                    <li><span  onClick={handleActive} className={ ` filter ${activeProduct ==="fictional" ? "active" : ""}  `}  data-category="fictional">Fictional</span></li>
                </ul>

                <div id="gallery" className="row mt-lg-5 mt-md-4 mt-sm-3 mt-2">

                {galleryData?.map((item) => {
                    return (
                          (activeProduct === "all" || item?.category === activeProduct)  && <ProductCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                author={item.author}
                                price={item.price}
                                img={item.img}
                                
                            />
                    )
                })}

                </div>

            </div>

        </div>
    </div>
</section>
</>
  )
}

export default React.memo(ProductGallery);
