import { useState, useEffect } from "react";
import Loader from "../Loader"
const ImageLoader = ({ src,link }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        setLoaded(true);
    };
    return ()=> setLoaded(false)
  }, [src]);
  return (
    <>
      {!loaded ?
        <Loader height="100%" />
        : (
          src.startsWith("http")?
          <a href={`https://openlibrary.org/${link}`} target="_blank">
            <img
              src={src}
              className="img-fluid"
            />
          </a>
          :
           <img
              src={src}
              className="img-fluid"
            />
        )}
    </>
  );
};

export default ImageLoader;
