import { createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
import ActionStateHook from "./components/pages/ActionStateHook"
import UseAPI from "./components/pages/UseAPI"

const Layout = lazy(() => import("./components/Layouts/Layout"))
const Home = lazy(() => import("./components/pages/Home"))
const FeatureSec = lazy(() => import("./components/pages/FeatureSec"))
const OfferSec = lazy(() => import("./components/pages/OfferSec"))
const ProductGallery = lazy(() => import("./components/pages/ProductGallery"))
const DownloadSec = lazy(() => import("./components/pages/DownloadSec"))
const ArticlesSec = lazy(() => import("./components/pages/ArticlesSec"))
const Login = lazy(() => import("./components/pages/Login"))
const PublicWrapper = lazy(() => import("./components/Layouts/PublicWrapper"))
const MainWrapper = lazy(() => import("./components/Layouts/MainWrapper"))
const BooksAPI = lazy(() => import("./components/pages/BooksAPI"))
const APIPagination2 = lazy(() => import("./components/pages/APIPagination2"))
const ReactSelect = lazy(() => import("./components/pages/ReactSelect"))
const APIPagination = lazy(() => import("./components/pages/APIPagination"))
const APIPractice = lazy(() => import("./components/pages/APIPractice"))
const NotFound = lazy(() => import("./NotFound"))
const CustomerReports = lazy(() => import("./components/pages/CustomerReports"))
const ManageEmployees = lazy(() => import("./components/pages/ManageEmployees"))
const EditEmployee = lazy(() => import("./components/pages/EditEmployee"))
export const routes = createBrowserRouter([
    {
        element: <MainWrapper />,
        children: [
            {
                element: <PublicWrapper />,
                children: [
                    {
                        path: "/",
                        element: <Login />
                    },
                    {
                        path: "/forgot",
                        element: <Login />
                    }
                ]
            },
            {
                element: <Layout />,
                children: [
                    {
                        path: "/home",
                        element: <Home />
                    },
                    {
                        path: "/Feature",
                        element: <FeatureSec />
                    },
                    {
                        path: "/Offers",
                        element: <OfferSec />
                    },
                    {
                        path: "/Gallery",
                        element: <ProductGallery />
                    },
                    {
                        path: "/downloadApp",
                        element: <DownloadSec />
                    },
                    {
                        path: "/Articles",
                        element: <ArticlesSec />
                    },

                    {
                        path: "/reactSelect",
                        element: <ReactSelect />
                    },
                    {
                        path: "/BooksAPI",
                        element: <BooksAPI />
                    },
                    {
                        path: "/BooksAPIPagination",
                        element: <APIPagination />
                    },
                    {
                        path: "/BooksAPIPagination2",
                        element: <APIPagination2 />
                    },
                    {
                        path: "/apipractice",
                        element: <APIPractice />
                    },
                    {
                        path: "/useActionState",
                        element: <ActionStateHook/>
                    },
                    {
                        path: "/use_api",
                        element: <UseAPI/>
                    },
                    {
                        path: "/customers_report",
                        element: <CustomerReports/>
                    },
                    {
                        path: "/manageEmployee",
                        element: <ManageEmployees/>
                    },
                    {
                        path: `/editEmployee/:id`,
                        element: <EditEmployee/>
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    },
])

