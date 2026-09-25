import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import RequestQuote from './pages/RequestQuote';
import About from './pages/About';
import Team from './pages/Team';
import ToolingServices from './pages/ToolingServices';
import InjectionMoulding from './pages/InjectionMoulding';
import Printing3D from './pages/Printing3D';
import Containers from './pages/Containers';
import ContainerDetail from './pages/ContainerDetail';
import BSPFittings from './pages/BSPFittings';
import BSPFittingDetail from './pages/BSPFittingDetail';
import HomeBrewProducts from './pages/HomeBrewProducts';
import HomeBrewDetail from './pages/HomeBrewDetail';
import OrderForm from './pages/OrderForm';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* ── Containers ── */}
        <Route path="products/containers"              element={<Containers />} />
        <Route path="products/containers/:slug"        element={<ContainerDetail />} />

        {/* ── BSP Fittings ── */}
        <Route path="products/bsp-fittings"            element={<BSPFittings />} />
        <Route path="products/bsp-fittings/:slug"      element={<BSPFittingDetail />} />

        {/* ── Home Brew Products ── */}
        <Route path="products/home-brew"               element={<HomeBrewProducts />} />
        <Route path="products/home-brew/:slug"         element={<HomeBrewDetail />} />

        {/* ── General products ── */}
        <Route path="products"                         element={<Products />} />
        <Route path="products/:slug"                   element={<ProductDetail />} />

        {/* ── Services ── */}
        <Route path="services/tooling"                 element={<ToolingServices />} />
        <Route path="services/injection-moulding"      element={<InjectionMoulding />} />
        <Route path="services/3d-printing"             element={<Printing3D />} />

        {/* ── Other pages ── */}
        <Route path="request-quote"                    element={<RequestQuote />} />
        <Route path="order-form"                       element={<OrderForm />} />
        <Route path="about"                            element={<About />} />
        <Route path="about/team"                       element={<Team />} />
        <Route path="contact"                          element={<Contact />} />
        <Route path="*"                                element={<NotFound />} />
      </Route>
    </Routes>
  );
}
