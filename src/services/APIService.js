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
export const LoginUser = async (LoginData) => {
  return await axios.post(
    `${import.meta.env.VITE_RETAILER_API}/login`,
    LoginData
  );
};
export const addCustomer = async (token,customerData) => {
  // console.log(token)
  return await axios.post(
    `${import.meta.env.VITE_RETAILER_API}/customers/add-customer`,
    customerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const showCustomersData = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/customers/fetch-customer`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const editCustomersData = async (token,delCustomer) => {
  return await axios.put(
    `${import.meta.env.VITE_RETAILER_API}/customers/change-status`,delCustomer,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
