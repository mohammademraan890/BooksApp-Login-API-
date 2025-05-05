import React from "react";
import { Link } from "react-router-dom"
const Logo = () => {
  return (
    <div>
      <h1 id="logo"><Link to="/"><span>Book</span>saw</Link></h1>
    </div>
  )
}

export default React.memo(Logo);
