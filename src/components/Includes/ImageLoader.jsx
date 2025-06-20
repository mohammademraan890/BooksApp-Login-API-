import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
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
        <Skeleton height={"100%"} width={"100%"}/>
        // <Loader height={"100%"}/>
        : (
          src?.startsWith("http")?
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
