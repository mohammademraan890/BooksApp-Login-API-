import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Includes/ProductCard";
import Heading1 from "../Includes/Heading1";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ReactPaginate from "react-paginate";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import Loader from "../Loader";

const APIPagination = () => {
  const [booksQuantity, setBooksQuantity] = useState(0);
  const [BooksData, setBooksData] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState(12)
  const [showErr, setShowErr] = useState(false)
  const [selected, setSelected] = useState(1)
  const [loader, setLoader] = useState(true)
  async function fetchData() {
    try {
      console.log(booksPerPage)
      setLoader(true)
      const response = await axios.get(
        `https://openlibrary.org/subjects/adventure.json?limit=${booksPerPage}&offset=${(selected - 1) * booksPerPage}`
      );
      // console.log(response)
      setBooksData(response?.data?.works);
      setLoader(false)
      setBooksQuantity(response?.data?.work_count);
      console.log(booksQuantity)
    } catch (err) {
      console.log(err);
      setLoader(false)
      setShowErr(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [booksPerPage, selected]);



  return (
    <div className="featured-sec-inner mt-5 obj-width1">
      <Heading1 title="API Books" desc="These Books come from open-library" />
      {!showErr ? <div className="row">
        {BooksData?.map((item, index) => (
          <ProductCard
            key={index}
            id={item.edition_count}
            title={item.title}
            link={item.key}
            author={item?.authors[0]?.name}
            price={35}
            img={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
          />
        ))}
      </div>
        :
        <h1 className="text-center py-5 bg-light text-danger"> {showErr?.message}</h1>
      }
      {loader && <Loader />}

      <div className="mb-5 mt-3 d-flex align-items-center justify-content-between ">

        <FormControl sx={{ width: "140px" }}>
          <InputLabel id="demo-simple-select-label">Books per Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={booksPerPage}
            label="Books per Page"
            onChange={(e) => { setBooksPerPage(e.target.value); setSelected(1) }}
          >
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={28}>28</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
        {booksPerPage < booksQuantity && <ReactPaginate
          nextLabel={<ArrowForwardIosOutlined className="paginationIcon" />}
          previousLabel={<ArrowBackIosOutlined className="paginationIcon" />}
          forcePage={selected - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={(e) => {
            setSelected(e.selected + 1);
            window.scrollTo(0, 0);
            setBooksData([])
          }}
          pageCount={Math.ceil(booksQuantity / (booksPerPage))}
        />
        }

      </div>
    </div>
  );
};

export default APIPagination;
