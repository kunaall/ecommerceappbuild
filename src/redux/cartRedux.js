import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    showCart: (state, action) => {
      state.products=action.payload.products;
      state.quantity=action.payload.totalquantity;
      state.total=action.payload.totalprice;
    
    },
  
    removeProduct: (state, action) => {
      state.quantity = action.payload.totalquantity;
      state.products=action.payload.products;
      state.total = action.payload.totalprice;

  },
  
  addproductsuccess: (state, action) => {
    state.quantity = action.payload.totalquantity;
    state.total=action.payload.totalprice;
    state.products=action.payload.products;

},
 
logoutcustomersuccess: (state, action) => {
  state.products = [];
  state.quantity=0;
  state.total=0;

}
}});

export const {removeProduct,showCart,addproductsuccess,logoutcustomersuccess} = cartSlice.actions;
export default cartSlice.reducer;