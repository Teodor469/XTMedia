import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import LaserEngraving from './pages/LaserEngraving'
import SublimationPrinting from './pages/SublimationPrinting'
import DTGPrinting from './pages/DTGPrinting'
import PhotoPrinting from './pages/PhotoPrinting'
import BrandProducts from './pages/BrandProducts'
import ProductSearch from './pages/ProductSearch'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'services/laser-engraving',
        element: <LaserEngraving />
      },
      {
        path: 'services/sublimation-printing',
        element: <SublimationPrinting />
      },
      {
        path: 'services/dtg-printing',
        element: <DTGPrinting />
      },
      {
        path: 'services/photo-printing',
        element: <PhotoPrinting />
      },
      {
        path: 'services/brand-products',
        element: <BrandProducts />
      },
      {
        path: 'products',
        element: <ProductSearch />
      },
      {
        path: 'search',
        element: <ProductSearch />
      },
      {
        path: 'reviews',
        element: <Reviews />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])