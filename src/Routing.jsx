import { createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
import AddProducts from "./components/pages/AddProducts"
import ReactSelect from "./components/pages/ReactSelect"

const Layout = lazy(() => import("./components/Layouts/Layout"))
const Home = lazy(() => import("./components/pages/Home"))
const FeatureSec = lazy(() => import("./components/pages/FeatureSec"))
const OfferSec = lazy(() => import("./components/pages/OfferSec"))
const ProductGallery = lazy(() => import("./components/pages/ProductGallery"))
const CartPage = lazy(() => import("./components/pages/CartItem"))
const DownloadSec = lazy(() => import("./components/pages/DownloadSec"))
const ArticlesSec = lazy(() => import("./components/pages/ArticlesSec"))
const WishList = lazy(() => import("./components/pages/WishList"))
const Login = lazy(() => import("./components/pages/Login"))
const Registeration = lazy(() => import("./components/pages/Registration/Registration"))
const PublicWrapper = lazy(() => import("./components/Layouts/PublicWrapper"))
const MainWrapper = lazy(() => import("./components/Layouts/MainWrapper"))
const BooksAPI = lazy(() => import("./components/pages/BooksAPI"))
export const routes = createBrowserRouter([
 {element: <MainWrapper/>,
    children: [

   
    {
        element: <PublicWrapper />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Registeration />
            },
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
                path: "/Cart",
                element: <CartPage />
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
                path: "/wishlist",
                element: <WishList />
            },
            {
                path: "/addproducts",
                element: <AddProducts />
            },
            {
                path: "/reactSelect",
                element: <ReactSelect />
            },
            {
                path: "/BooksAPI",
                element: <BooksAPI />
            },
        ]
    }
     ]
 }
])

