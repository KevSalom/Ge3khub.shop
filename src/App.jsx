import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Views/Home/Home";
import ProductDetails from "./Views/ProductDetails/ProductDetails";
import Legal from "./Views/Legal/Legal";
import Error404 from "./Views/Error404/Error404";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ThemeView from "./Views/ThemeView/ThemeView";
import Category from "./Views/Category/Category";
import SearchResults from "./Views/SearchResults/SearchResults";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import Profile from "./components/Profile/Profile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; //Para poder ir al inicio (arriba) de la pagina al cambiar de vista
import CartColumn from "./Views/CartColumn/CartColumn";
import { cartStore } from "./zustand/cartStore/cartStore";

function App() {
  const{cart}=cartStore() //traemos el estado de zustand  
  return (
    <div className={`${cart.length > 0 ? 'col-md-11 ': 'col-md-12' } vh-100 d-flex flex-column`}>
      <NavBar />
      <ScrollToTop/>       
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:nameCategory" element={<Category />} />
          <Route path="/thematic/:nameThematic" element={<ThemeView />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      {
        cart.length>0 && <CartColumn/> //solo renderiza si tenemos articulos en el cart
      }
      
      <Footer />
    </div>
  );
}

export default App;
