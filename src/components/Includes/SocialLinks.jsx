import React from "react";

const SocialLinks = () => {
  return (
    <div>
      <ul className="social-links p-0 d-flex m-0">
        <li>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxl-twitter"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bxl-youtube"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-book-heart"></i>
          </a>
        </li>

      </ul>
    </div>
  );
};

export default React.memo(SocialLinks);
