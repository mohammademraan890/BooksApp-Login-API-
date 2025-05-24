import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing";

import StoreContextProvider from "./context/StoreContext";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/Auth";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <AuthProvider>
      <StoreContextProvider>
        <Suspense fallback={<Loader height="100vh" />}>
          <RouterProvider router={routes} />
        </Suspense>
      </StoreContextProvider>
    </AuthProvider>
  );
};
export default App;
