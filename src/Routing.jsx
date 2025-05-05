import { createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

const Layout = lazy(() => import("./Layouts/Layout"))
const Home = lazy(() => import("./components/pages/Home"))
const FeatureSec = lazy(() => import("./components/pages/FeatureSec"))
const OfferSec = lazy(() => import("./components/pages/OfferSec"))
const ProductGallery = lazy(() => import("./components/pages/ProductGallery"))
const CartPage = lazy(() => import("./components/pages/CartItem"))
const DownloadSec = lazy(()=> import("./components/pages/DownloadSec"))
const ArticlesSec = lazy(()=> import("./components/pages/ArticlesSec"))
const WishList = lazy(()=> import("./components/pages/WishList"))

  export const routes= createBrowserRouter([
        {
            element: <Layout/>,
            children:[
                {
                    path: "/",
                    index: true,
                    element: <Home/>
                },
                {
                    path : "/Feature",
                    element: <FeatureSec/>
                },
                {
                    path: "/Offers",
                    element: <OfferSec/>
                },
                {
                    path: "/Gallery",
                    element: <ProductGallery/>
                },
                {
                    path: "/Cart",
                    element: <CartPage/>
                },
                {
                    path: "/downloadApp",
                    element: <DownloadSec/>
                },
                {
                    path: "/Articles",
                    element: <ArticlesSec/>
                },
                {
                    path: "/wishlist",
                    element: <WishList/>
                }
            ]
        }
    ])

