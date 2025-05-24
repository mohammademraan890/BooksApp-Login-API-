import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../Includes/ProductCard";
import Heading1 from "../Includes/Heading1";
import Loader from "../Loader";

const BooksAPI = () => {
  const [booksQuantity, setBooksQuantity] = useState(8);
  const [BooksData, setBooksData] = useState([]);
  const [showErr,setShowErr] = useState(false)
  const loaderRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://openlibrary.org/subjects/adventure.json?limit=${booksQuantity}`
      );
      setBooksData(response.data.works);
      setShowLoader(false);
    } catch (err) {
      console.log(err);
      setShowErr(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [booksQuantity]);

  useEffect(() => {
    if (!BooksData.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(()=>{
            setShowLoader(true);
          },2000)
          setBooksQuantity((prev) => prev + 8); 
          observer.unobserve(loaderRef.current);
        }
      });
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [BooksData]); // ✅ Watch for changes in book list

  return (
    <div className="featured-sec-inner mt-5 obj-width1">
      <Heading1 title="API Books" desc="These Books come from open-library" />
     { !showErr ? <div className="row">
        {BooksData?.map((item, index) => (
          <ProductCard
            key={index}
            id={item.edition_count}
            title={item.title}
            link={item.key}
            author={item.authors[0].name}
            price={35}
            img={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
          />
        ))}
      </div>
      :
      <h1 className="text-center py-5 bg-light text-danger"> {showErr.message}</h1>

}
      <div className="mt-3 mb-5" ref={loaderRef}>
        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default BooksAPI;
