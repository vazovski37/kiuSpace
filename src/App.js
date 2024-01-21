import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import KiuHelp from './pages/KiuHelp';
import KiuHost from './pages/KiuHost';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import ImageUpload from './components/Product/ImageUpload.jsx';
import './app.css';
import AddProduct from './components/Product/AddProduct.jsx'
import EditProduct from './components/Product/EditProduct.jsx';
import ProductDetails from './components/productDetails/ProductDetails.jsx';

function App() {
  const location = useLocation();

  // Define an array of paths where you want to hide Navbar and Footer
  const excludedPaths = ['/login', '/registration'];

  // Function to check if current path is in the excludedPaths array
  const isExcludedPath = () => excludedPaths.includes(location.pathname);

  return (
    <>
      {!isExcludedPath() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kiuHelp" element={<KiuHelp />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/Profile/:nickName" element={<Profile />} />
        <Route path="/kiuHost" element={<KiuHost />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />        
        <Route path='/dopa' element={<ImageUpload />} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/editProduct/:productId' element={<EditProduct />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
      {!isExcludedPath() && <Footer />}
    </>
  );
}

export default App;
