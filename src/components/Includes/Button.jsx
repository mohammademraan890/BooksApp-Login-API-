import React from "react";

const Button = ({text}) => {
    return (
      <div>
        <button className="button simplebtn ">
         {text}<i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    );
  };
  
  export default React.memo(Button);
  