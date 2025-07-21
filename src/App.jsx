// src/App.tsx - The new, merged application root

// --- Imports from the original .tsx file (shadcn, react-query) ---
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- Imports from the original .jsx file (bootstrap, custom state, layout) ---
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style.css'; // Adjust path if needed
import './assets/loader.css'; // Adjust path if needed
import { ToastContainer } from 'react-toastify';
import { MyStoreProvider, myStoreHook } from './MyStoreContext'; // Make sure this path is correct
import NavBar from "./layouts/NavBar";
import Footer from './layouts/Footer';
import Loader from './layouts/Loader';

// --- Combined list of all your page components ---
import Index from "./pages/Index"; // Or Home
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import MyAccount from "./pages/MyAccount";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage"; // Or SingleProduct
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";
import PaymentSuccess from "./pages/PaymentSucess";

const queryClient = new QueryClient();

// A new component to hold the layout, making it easy to access the hook
const AppLayout = () => {
  const { loader, isAuthenticated, cart, setUserLogout } = myStoreHook();

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} cartItem={cart} setUserLogout={setUserLogout} />
      <div className="container">
        <ToastContainer />
        {loader && <Loader />}
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

// All combined routes in one place
const AppRoutes = () => {
    const { 
        addProductsToCart, 
        removeItemsFromCart, 
        loggedInUserData, 
        clearCartItem,
        setLoggedInUserData,
        setUserLoggedInStatus,
        setPageLoading,
        isAuthenticated,
        cart
      } = myStoreHook();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products onAddToCart={addProductsToCart} setPageLoading={setPageLoading} />} />
      <Route path="/products/:id" element={<ProductPage onAddToCart={addProductsToCart} setPageLoading={setPageLoading} />} />
      <Route path="/cart" element={<Cart isAuthenticated={isAuthenticated} onRemoveProduct={removeItemsFromCart} cart={cart} />} />
      <Route path="/checkout" element={<Checkout loggedInUserData={loggedInUserData} clearCartItem={clearCartItem} />} />
      <Route path="/my-orders" element={<MyOrders setPageLoading={setPageLoading} loggedInUserData={loggedInUserData} />} />
      <Route path="/my-account" element={<MyAccount loggedInUserData={loggedInUserData} />} />
      <Route path="/login" element={<Auth setLoggedInUserData={setLoggedInUserData} isAuthenticated={setUserLoggedInStatus} setPageLoading={setPageLoading} />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
};

// The final top-level App component, responsible only for providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <MyStoreProvider> {/* The main state provider you chose */}
      <TooltipProvider>
        <BrowserRouter>
          <Toaster /> {/* Notification system 1 */}
          <Sonner /> {/* Notification system 2 */}
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </MyStoreProvider>
  </QueryClientProvider>
);

export default App;