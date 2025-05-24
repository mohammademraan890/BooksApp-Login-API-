import React from "react";

const Loader = ({height}) => {
  return (
    <div style={{height:height}} className="loader-Cont">
      <div className="loader"></div>
    </div>
  )
}

export default React.memo(Loader);


