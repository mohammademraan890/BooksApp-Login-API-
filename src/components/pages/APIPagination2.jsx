import { useEffect, useState } from "react";
import { fetchAPIData } from "../../services/APIService";
import Heading1 from "../Includes/Heading1";
import ProductCard from "../Includes/ProductCard";
import Loader from "../Loader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ReactPaginate from "react-paginate";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";

const APIPagination2 = () => {
    const [booksQuantity, setBooksQuantity] = useState(0);
    const [BooksData, setBooksData] = useState([]);
    const [booksPerPage, setBooksPerPage] = useState(12);
    const [selected, setSelected] = useState(0);
    const [loader, setLoader] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);
    const [category, setCategory] = useState("adventure");

    const loadData = async (subject = "adventure", itemsInPage = 12, pgSelected = 0) => {
        try {
            setLoader(true);
            setDataFetched(false);
            const offset = pgSelected * itemsInPage;
            const responseData = await fetchAPIData(subject, itemsInPage, offset);
            console.log(responseData)
            setBooksData(responseData?.data?.docs || []);
            setBooksQuantity(responseData?.data?.numFound || 0);
        } catch (err) {
            console.log(err);
            setBooksQuantity(0);
        } finally {
            setLoader(false);
            setDataFetched(true);
        }
    };

    useEffect(() => {
        const trimmed = category.trim();
        if (!trimmed) return;
        const timer = setTimeout(() => {
            loadData(category, booksPerPage, 0);
        }, 300);
        return () => clearTimeout(timer);
    }, [category]);

    useEffect(() => {
        loadData();
    }, []);
    console.log(import.meta.env.MODE);

    return (
        <>
            <div className="featured-sec-inner mt-5 obj-width1">
                <Heading1 title="Pagination Data" desc="Contains Pagination with filter apply." />
                <input
                    type="text"
                    className="form-control mb-3 w-25"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setSelected(0);
                    }}
                    placeholder="Enter books category."
                />

                {loader ? (
                    <div className="mb-4">
                        <Loader />
                    </div>
                )

                    : !loader && booksQuantity > 0 ? (


                        <div className="row">
                            {BooksData?.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    id={item?.edition_count}
                                    title={item?.title || "UnKnown Book"}
                                    link={item?.key}
                                    author={item?.author_name?.[0] || "Unknown Author"}
                                    price={35}
                                    img={
                                        item?.cover_i
                                            ? `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`
                                            : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                                    } />
                            ))}
                        </div>

                    ) : dataFetched ? <h4 className="text-center text-secondary">No books found.</h4> : null}



                {booksQuantity > 0 && (
                    <div className="mb-5 mt-3 d-flex align-items-center justify-content-between">
                        <FormControl sx={{ width: "140px" }}>
                            <InputLabel id="demo-simple-select-label">Books per Page</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={booksPerPage}
                                label="Books per Page"
                                onChange={(e) => {
                                    const newLimit = e.target.value;
                                    setBooksPerPage(newLimit);
                                    loadData(category, newLimit, 0);
                                    window.scrollTo(0, 0);
                                    setSelected(0);
                                }}
                            >
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={28}>28</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                            </Select>
                        </FormControl>

                        <ReactPaginate
                            nextLabel={<ArrowForwardIosOutlined className="paginationIcon" />}
                            previousLabel={<ArrowBackIosOutlined className="paginationIcon" />}
                            forcePage={selected}
                            marginPagesDisplayed={2}
                            onPageChange={(e) => {
                                const newPage = e.selected;
                                setSelected(newPage);
                                loadData(category, booksPerPage, newPage);
                                window.scrollTo(0, 0);
                            }}
                            pageCount={Math.ceil(booksQuantity / booksPerPage)}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default APIPagination2;
