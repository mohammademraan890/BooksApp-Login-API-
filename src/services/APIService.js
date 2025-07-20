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


export const getSuppliersName = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/suppliers/fetch-supplier`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const showCustomersReport = async (token,{supplierField, statusField, startDate, endDate}) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/reports/purchase-report?supplier=${supplierField}&payment_status=${statusField}&start_date=${startDate}&end_date=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const fetchDesignation = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/designations/fetch-designation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const addEmployee = async (token,employeeData) => {
  return await axios.post(
    `${import.meta.env.VITE_RETAILER_API}/employees/add-employee`,employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // contentType: "multipart/form-data"
      },
    }
  );
};
export const showEmployees = async (token) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/employees/fetch-employee`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const delEmployee = async (token,employeeData) => {
  return await axios.put(
    `${import.meta.env.VITE_RETAILER_API}/employees/change-status-employee`,employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const selectEmployee = async (token,empId) => {
  return await axios.get(
    `${import.meta.env.VITE_RETAILER_API}/employees/fetch-employee/${empId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const editEmployee = async (token,empData) => {
  return await axios.post(
    `${import.meta.env.VITE_RETAILER_API}/employees/edit-employee`,empData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
