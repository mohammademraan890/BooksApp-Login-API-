import axios from "axios";

export const fetchData = async (booksQuantity) => {
  return await axios.get(
    `${import.meta.env.VITE_OPEN_LIBRARY_API}?limit=${booksQuantity}`
  );
};

export const fetchAPIData = async (category, booksQuantity, offset) => {
  const URL_API = import.meta.env.VITE_OPEN_LIBRARY_SEARCH_API_Pagination;

  return await axios.get(
    `${URL_API}?q=${category}&limit=${booksQuantity}&offset=${offset}`
  );
};

export const JSON_API_Data= async()=>{
  return await axios.get(import.meta.env.VITE_JSON_API)
}