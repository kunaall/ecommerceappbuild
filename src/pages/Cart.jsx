import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeproduct } from "../redux/apiCalls";

import { NotificationManager } from "react-notifications"
import { createOrder } from "../redux/apiCalls";




const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  font-weight: 780;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-right:70px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
font-weight: 780;
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 8px;
  padding-right: 70px;

`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;






const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const ProductAmount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const Deletediv = styled.h1`
  margin-left: 10px;
  padding-bottom: 4px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05); 
  }
`;


const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 4px;

  cursor: pointer;
  &:hover {
    background-color:#343C40;
  }
`;
const Productt = styled.div`
 
`;








const Cart = () => {
  let cart = useSelector((state) => state.cart);
  const user = useSelector(state=>state.user.currentUser);
  
  
  const [stripeToken, setStripeToken] = useState(null);
  const navigate  = useNavigate ();
  const dispatch=useDispatch();
 
  
  

  const onToken = (token) => {
    setStripeToken(token);
  };
  
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && cart.total>=1 && makeRequest();
  }, [stripeToken, cart.total, navigate,cart ]);

  const handleRemove = (product) => {
    removeproduct(dispatch, {...product,userid:user._id});
  };



  const handleClick =() => {console.log("dfd");
    if(!cart.total){NotificationManager.error('Cart is empty!',"",2000)}
    else{
   
      
      createOrder(dispatch, {products:cart.products,total:cart.total,userid:user._id,quantity:cart.quantity});}}
      

      
      
  
  return (
    <Container>
       <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <div onClick={() => navigate(-1)}><TopButton type="filled" >CONTINUE SHOPPING</TopButton></div>
          <TopTexts>
            <TopText>Shopping Bag  ({cart.quantity})</TopText>
          </TopTexts>
         
        </Top>
        <Bottom>
          <Info>













            
            
            
            {cart.products.map((product,index) =>{if(index!==0){

return (
              
  <Product item={product} key={index}>
  
  <ProductDetail>
    <Image src={product.img} />
    <Details>
      <ProductName>
        <b>Product:</b> {product.title}
      </ProductName>
      <ProductId>
        <b>ID:</b> {product.id}
      </ProductId>
      <ProductColor color={product.color} />
      <ProductSize>
        <b>Size:</b> {product.size}
      </ProductSize>
    </Details>
  </ProductDetail>
  <PriceDetail>
    <ProductAmountContainer>
      
      <ProductAmount>{product.quantity}</ProductAmount>
      <Deletediv >
        <DeleteIcon onClick={()=>handleRemove(product)}/>
      </Deletediv>
      
      
    </ProductAmountContainer>
    <ProductPrice>
    ₹ {product.price * product.quantity}
    </ProductPrice>
  </PriceDetail>
</Product>)





            }else{

return (<Productt item={product} key={index}></Productt>)
            } }
            
            
            )}
          
              
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.quantity}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>


            <StripeCheckout
              name="Kunal Indiacart Standard "
              image="https://ts2.mm.bing.net/th?q=what%20to%20call%20a%20good%20looking%20guy%20like-opinion"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={process.env.REACT_APP_STRIPE_KEYY}
            >
              <Button type="filled">Pay Now Via Debit/UPI</Button>
              
            </StripeCheckout>
            
              <Button type="filled" onClick={()=>handleClick()}>Buy Now With COD</Button>
           
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
