import { NotificationManager } from "react-notifications"
import { Button } from "@mui/material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest} from "../requestMethods";






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
  padding: 20px;
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


const ProductIddd = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
 
  
`;
const Filter = styled.div`
  margin: 20px;
  align-items: center;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;






const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;









const Orderspage = () => {
  

const [orders, setOrders] = useState([]);
const [filters, setFilters] = useState({});









  useEffect(() => {
    
    const getOrders = async () => {
      try{
        
        
        const ress=await publicRequest.get("/orders");
        setOrders(ress.data);
       
     
      } catch (err) {}
    };
    getOrders();
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      [e.target.name]: value,
    });
  };
 
  const handleUpdate = async(order) =>  {
 const statuss=filters.status;
 console.log(statuss);
    try {    await publicRequest.post("/orders/update", {orderid:order._id,status:statuss});
    NotificationManager.success('Order updated!',"",2000);
   
          } catch (err) {console.log(err);}
           
  };
      

      
      
  
  return (
    <Container>
       <Announcement />
      <Navbar />
      <Wrapper>
        <Title>DASHBOARD</Title>
        <Top>
          
         
         
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
        
      </ProductId>
      
      <ProductIddd>

      <Filter>
          <FilterText>Status:</FilterText>
          <Select name="status" onChange={(e) => handleFilters(e)}>
            <Option disabled>Status</Option>
            <Option>Ordered</Option>
            <Option>Shipped</Option>
            <Option>Out for delivery</Option>
          
            <Option>Delivered</Option>
            
          </Select>  </Filter>



     </ProductIddd>
     <Button variant="contained" onClick={()=>handleUpdate(order)}>Update</Button>
      
     
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
