import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing";

import StoreContextProvider from "./context/StoreContext";
import Loader from "./components/Loader";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);
  return (
    <StoreContextProvider>
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={routes} />
      </Suspense>
    </StoreContextProvider>
  );
};
export default React.memo(App);
