import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndCondition from './pages/TermAndCondition';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}></Route>
          <Route path='contact' element={<Contact/>}></Route>
          <Route path='store' element={<OurStore/>}></Route>
          <Route path='/:id' element={<SingleProduct/>}></Route>
          <Route path='blogs' element={<Blog/>}></Route>
          <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes>}></Route>
          <Route path='my-orders' element={<PrivateRoutes><Orders/></PrivateRoutes>}></Route>
          <Route path='my-profile' element={<PrivateRoutes><Profile/></PrivateRoutes>}></Route>
          <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}></Route>
          <Route path='blog/:id' element={<SingleBlog/>}></Route>
          <Route path='compare-product' element={<CompareProduct/>}></Route>
          <Route path='wishlist' element={<PrivateRoutes><Wishlist/></PrivateRoutes>}></Route>
          <Route path='login' element={<OpenRoutes><Login/></OpenRoutes>}></Route>
          <Route path='forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='signup' element={<OpenRoutes><Signup/></OpenRoutes>}></Route>
          <Route path='reset-password' element={<ResetPassword/>}></Route>
          <Route path='privacy-policy' element={<PrivacyPolicy/>}></Route>
          <Route path='refund-policy' element={<RefundPolicy/>}></Route>
          <Route path='shipping-policy' element={<ShippingPolicy/>}></Route>
          <Route path='termandconditions' element={<TermAndCondition/>}></Route>
          <Route path='product/:id' element={<SingleProduct/>}></Route>
          <Route path='store/product/:id' element={<SingleProduct/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
