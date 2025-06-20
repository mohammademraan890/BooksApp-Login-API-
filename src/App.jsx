import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'aos/dist/aos.css';
import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routing";
import 'react-loading-skeleton/dist/skeleton.css';
import AppContextProvider from "./context/AppContext";
import Loader from "./components/Loader";
import { SkeletonTheme } from "react-loading-skeleton";
import NoInternet from "./NoInternet";
import Aos from "aos";
const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
    return (
      <NoInternet>
      <AppContextProvider>
        <SkeletonTheme duration={2}>
          <Suspense fallback={<Loader height="100vh" />}>
            <RouterProvider router={routes} />
          </Suspense>
        </SkeletonTheme>
      </AppContextProvider>
      </NoInternet>
    )
};
export default App;
