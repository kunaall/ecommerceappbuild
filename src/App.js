import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orderspage from "./pages/Orderspage";
import Dashboard from "./pages/Dashboard";



import "./index.css";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import ScrollToTop from "../src/components/scrollToTop";



const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  
  
  return (<><NotificationContainer />
    <Router>
      <Routes >
      
      <Route exact path="/" element={<><ScrollToTop /><Home /></>}/>
       
       
        <Route path="/products/categories/:category" element={<> <ScrollToTop /><ProductList /></>}/>
          
        <Route path="/products/:id"  element={<><ScrollToTop /><Product /></>}/>
       
        <Route path="/cart"  element={<><ScrollToTop /><Cart /></>}/> 

        <Route path="/success"  element={<Success />}/>
       
        <Route path="/login" element={user ? <Navigate replace to='/'/> : <Login/>} />
        
        <Route path="/register" element={user ? <Navigate replace to='/'/> : <Register/>} />
        <Route path="/orders"  element={<Orderspage />}/>
        <Route path="/dashboard"  element={<Dashboard />}/>
        
      </Routes >
    </Router></>
  );
};

export default App;
