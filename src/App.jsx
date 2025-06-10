import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing";
import 'react-loading-skeleton/dist/skeleton.css';
import AppContextProvider from "./context/AppContext";
import Loader from "./components/Loader";
import { SkeletonTheme } from "react-loading-skeleton";
const App = () => {
  const [online, setOnline] = useState(navigator.onLine)
  console.log(online)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.addEventListener("online", () => setOnline(true))
    window.addEventListener("offline", () => setOnline(false))
  }, []);
  if (online) {
    return (
      <AppContextProvider>
        <SkeletonTheme duration={2}>
          <Suspense fallback={<Loader height="100vh" />}>
            <RouterProvider router={routes} />
          </Suspense>
        </SkeletonTheme>
      </AppContextProvider>
    )

  }
  else {

    return (
      <div className="bg-light d-flex  align-items-center justify-content-center " style={{ height: "100vh" }}><h1>You are offline</h1></div>
    )
  }
};
export default App;
