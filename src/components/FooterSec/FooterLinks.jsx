import { footerLinks } from "../../Data";

const FooterLinks = () => {
  return (
    <>
      {footerLinks?.map((item, index) => (
        <div
          key={index}
          className="ft-sec mb-md-0 mb-sm-4 mb-4 col-lg-2 col-md-2 col-sm-3 col-6"
        >
          <h4>{item.title}</h4>
          <ul className="footer-links mt-md-4 mt-sm-2 mt-2">
            {item?.links?.map((link, i) => (
              <li key={i}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterLinks;
