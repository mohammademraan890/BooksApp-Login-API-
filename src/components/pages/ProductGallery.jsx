import React, { useContext, useEffect, useState } from "react"
import Heading1 from "../Includes/Heading1"
import ProductCard from "../Includes/ProductCard"
import { StoreContext } from "../../context/StoreContext"
const ProductGallery = () => {
    const { State } = useContext(StoreContext)
    const { AllBooks } = State
    const [filteredBooks, setFilteredBooks] = useState(AllBooks)
    const [activeProduct, setActiveProduct] = useState("all genre")
 
    useEffect(() => {
        if (activeProduct === "all genre") {
            setFilteredBooks(AllBooks)
        }
        else {
            const newArr = AllBooks?.filter((item) => item?.category === activeProduct)
            setFilteredBooks(newArr)
        }
    }, [activeProduct, AllBooks])

    useEffect(() => {
        document.title = "Gallery || BookSaw"
    }, [])
    const categories = ["all genre", "business", "technology", "romantic", "adventure", "fictional"]
    return (
        <>
            <Heading1 title={"popular books"} desc={"some quality items"} />
            <section data-aos="fade-up" data-aos-duration="1100" className="gallery-sec">
                <div className="gallery-sec-inner obj-width1">
                    <div className="wrap">
                        <div className="gallery-wrap">

                            <ul id="filters" className="clearfix">
                                {categories?.map((category, index) => {
                                    return <li key={index}><span onClick={()=>{
                                        setActiveProduct(category)
                                    }} className={` filter ${activeProduct === category ? "active" : ""}  `} >{category}</span></li>
                                })}

                            </ul>

                            <div id="gallery" className="row mt-lg-5 mt-md-4 mt-sm-3 mt-2">

                                {filteredBooks?.map((item) => {
                                    return (
                                        <ProductCard
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
