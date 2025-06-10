// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../Includes/ProductCard";
import Heading1 from "../Includes/Heading1";
import Loader from "../Loader";
import { fetchData } from "../../services/APIService";
const BooksAPI = () => {
  const [booksQuantity, setBooksQuantity] = useState(8);
  const [BooksData, setBooksData] = useState([]);
  const [showErr, setShowErr] = useState(false)
  const loaderRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  console.log(import.meta.env.VITE_TEST)
  // async function fetchData() {
  //   try {
  //     // setShowLoader(true);
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_OPEN_LIBRARY_API}?limit=${booksQuantity}`
  //     );                                     
  //     console.log(`${import.meta.env.VITE_OPEN_LIBRARY_API}?limit=${booksQuantity}`)
  //     console.log(   `https://openlibrary.org/subjects/adventure.json?limit=${booksQuantity}`)

  //     setBooksData(response?.data?.works);
  //     setShowLoader(false);
  //     console.log(response)
  //   } catch (err) {
  //     console.log(err);
  //     setShowErr(err)
  //     setShowLoader(false)
  //   }
  // }
  // const data=fetchData(booksQuantity)
  const loadData = async () => {
    try {
      const responseData = await fetchData(booksQuantity);
      setBooksData(responseData?.data?.works||[])
      console.log(responseData)
    }
    catch (err) {
      setShowErr(err)
    }
    finally{
      setShowLoader(false)
    }
  }
  useEffect(() => {
    loadData()
  }, [booksQuantity]);

  useEffect(() => {
    if (!BooksData?.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries?.forEach((entry) => {
        if (entry?.isIntersecting) {
          setBooksQuantity(booksQuantity + 8);
          setShowLoader(true)
          observer.unobserve(loaderRef?.current);
        }
      });
    });

    if (loaderRef.current) {
      observer?.observe(loaderRef?.current);
    }
  }, [BooksData]);

  return (
    <div className="featured-sec-inner mt-5 obj-width1">
      {/* <button className="btn" onClick={()=> console.log(fetchData(22))}>Test</button> */}
      <Heading1 title="API Books" desc="These Books come from open-library" />
      {!showErr ? <div className="row">
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
        <h1 className="text-center py-5 bg-light text-danger"> {showErr?.message}</h1>

      }
      <div className="mt-3 mb-5" ref={loaderRef}>
        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default BooksAPI;
