import { loginFailure, loginStart, loginSuccess, 
  registerFailure,registerSuccess ,registerStart,
  logoutStart,logoutSuccess } from "./userRedux";
  import { showCart,addproductsuccess,removeProduct,logoutcustomersuccess } from "./cartRedux";

import { publicRequest } from "../requestMethods";
import { NotificationManager } from "react-notifications"





export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    NotificationManager.success('Logged in successfully!',"",2000);
      
      try{
        const id=res.data._id;
        
        const ress=await publicRequest.post("/carts/usercart", {userid:id});
       
      
    dispatch(showCart(ress.data));
  }catch(err) {console.log(err);}}

  catch (err) {
    dispatch(loginFailure());
    NotificationManager.error('Invalid Credentials!',"",2000);
  }}


export const register = async (dispatch, user) => {
  dispatch(registerStart());
  
  try {
  
    
    const res = await publicRequest.post("/auth/register", user);
    
    dispatch(registerSuccess(res.data));
    NotificationManager.success('Registered and logged in ',"",2000);
    const id=res.data._id;
    
    try{
     
      const ress=await publicRequest.post("/carts/newcart",{userid:id});
    
   
    dispatch(showCart(ress.data));
  }catch(err) {console.log(err);}
   

  } catch (err) {
    dispatch(registerFailure());
    NotificationManager.error('Register failed!',"",2000);
  }
};

export const createOrder = async (dispatch, user) => {

  
  try {
  
    
    const idd =user.userid;
       const res=await publicRequest.post("/orders/neworder",{userid:idd,products:user.products,amount:user.total,quantity:user.quantity});
    
    dispatch(logoutcustomersuccess(res.data));
    NotificationManager.success('Order placed successfully',"",2000);}
    catch (err) {
      console.log(err);
    }
    
    
    try{
      const idd =user.userid;
      const ress=await publicRequest.post("/carts/newordercart",{userid:idd});
     
   
    dispatch(showCart(ress.data));
  }catch(err) {console.log(err);}
   

  } 


export const addproduct = async (dispatch, data) => {
  try {
  
    
    const res = await publicRequest.post("/carts/add", {
          body: {
            data
          },
          headers: { "Content-Type": "application/json" },
        })
    dispatch(addproductsuccess(res.data));
    NotificationManager.success('Product added to cart',"",2000);
  } catch (err) {console.log(err);
    NotificationManager.error('Cannot add the product',"",2000);
  }
};

export const removeproduct = async (dispatch, data) => {
  try {
  
    
    const res = await publicRequest.post("/carts/delete", {
          body: {
            data
          },
          headers: { "Content-Type": "application/json" },
        });
       
    dispatch(removeProduct(res.data));
  } catch (err) {console.log(err);
  }
};


export const Logout = (dispatch) => {
  
  dispatch(logoutStart());
  
  dispatch(logoutSuccess());
  dispatch(logoutcustomersuccess());
  NotificationManager.success('Logged out successfully!',"",2000);


};
