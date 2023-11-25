import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest} from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications"




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
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;


const ProductDetail = styled.div`
  flex: 2;
  flex-direction: column;
  display: flex;
`;
const Details = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid;
  margin-bottom:5px;
  background-color:#B1E2E0  ;
  border-radius:10px;
 
  &:hover {
    background-color: lightblue;
  }
 
`;


const ProductName = styled.span`
padding:5px;`;

const ProductId = styled.span`
padding: 5px;`;

const ProductIdd = styled.div`
display: inline-block;
margin-left: 5px;


border-radius: 50%;
border-style: solid;
border-width: 0.5px;
border-color: green;
background-color:green;
height: 12px;
width: 12px;`;
const ProductIddd = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
 
  
`;

const Deletediv = styled.h1`
display: inline-block;
display:flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5em;
 
  
  
  cursor: pointer;
  &:hover {
    transform: scale(1.1); 
  }
`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;









const Orderspage = () => {
  const user = useSelector(state=>state.user.currentUser);
const id=user._id;
const [orders, setOrders] = useState([]);
const [count, setCount] = useState(0);

const navigate  = useNavigate ();


const handleRemove = async(order) =>  {
 
  try {    await publicRequest.post("/orders/deleteorder", {orderid:order._id});
  NotificationManager.success('Order canceled!',"",2000);
 
        setCount(count+1); } catch (err) {console.log(err);}
         
};



  useEffect(() => {
    
    const getOrders = async () => {
      try{
        
        
        const ress=await publicRequest.post("/orders/userorders", {userid:id});
        setOrders(ress.data);
       
     
      } catch (err) {}
    };
    getOrders();
  }, [id,count]);
  
 

      

      
      
  
  return (
    <Container>
       <Announcement />
      <Navbar />
      <Wrapper>
        <Title>MY ORDERS</Title>
        <Top>
          <div onClick={() => navigate(-1)}><TopButton type="filled" >CONTINUE SHOPPING</TopButton></div>
         
         
        </Top>
        <Bottom>
          <Info>



          {orders.map((order,index) =>{

return (
             
  <Product item={order} key={index}>
  
  <ProductDetail>
    
    <Details>
      <ProductName>
        <b>OrderId:</b> {order._id}
      </ProductName>
      <ProductId>
        <b>No of Products:</b> {order.Totalproducts}
      </ProductId>
      <ProductId>
        <b>Amount:</b> {order.amount}
      </ProductId>
      <ProductId>
        <b>Status:</b> {order.status==="ordered" ? "Order Placed":order.status}
      </ProductId>
      
      <ProductIddd><ProductIdd/><b>Yet to be delivered</b>
     </ProductIddd><Deletediv ><DeleteIcon onClick={()=>handleRemove(order)}/></Deletediv >
      
     
    </Details>
  </ProductDetail>
 
</Product>)





            }
            
            
            )}





          
              
            <Hr />
          </Info>
         
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Orderspage;
