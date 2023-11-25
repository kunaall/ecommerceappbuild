import Badge from '@mui/material/Badge';
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from '../redux/apiCalls';








const Container = styled.div`
  height: 50px;
  background-color:mistyrose;
  
  
  
  
  
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
 

  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 4px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  
  display: flex;
  align-items: center;
  margin-left: 5px;
  padding: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  font-size: 11x;
  border-radius:4px;
  margin-right: 5px;
  cursor: pointer;
  border: 0px solid gray;
  padding: 6px;
  filter: drop-shadow( 1px gray);
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align:center;
  position: absolute;
  padding-left: 550px;
  padding-top:10px;
  
`;





const Logo = styled.h1`
  font-weight: bold;
  transform: translate(-40px,-7px);  
  
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.button`
outline: none;
cursor: pointer;
margin-right:4px;
font-size: 10px;
line-height: 1;
border-radius: 500px;
transition-property: background-color,border-color,color,box-shadow,filter;
transition-duration: .3s;
border: 1px solid transparent;
letter-spacing: 2px;
min-width: 110px;
text-transform: uppercase;
white-space: normal;
font-weight: 700;
text-align: center;
padding: 4px 4px;
color: #fff;
background-color: #1ED760;
height: 34px;
:hover{
    transform: scale(1.04);
    background-color: #21e065;
}
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Button = styled.button`
outline: none;
cursor: pointer;
font-size: 10px;
line-height: 1;
border-radius: 500px;
transition-property: background-color,border-color,color,box-shadow,filter;
transition-duration: .3s;
border: 1px solid transparent;
letter-spacing: 2px;
min-width: 110px;
text-transform: uppercase;
white-space: normal;
font-weight: 700;
text-align: center;
padding: 4px 4px;
color: #fff;
background-color: #1ED760;
height: 34px;
:hover{
    transform: scale(1.04);
    background-color: #21e065;
}

`;


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  
  
  const user = useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch();


const handleclick=()=>{
  Logout(dispatch);
  window.history.replaceState(null, null, "/");
}
  
 
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <div style={{cursor:"pointer"}}><SearchContainer>
            <Input placeholder=" Search" />
            <Search style={{marginLeft:0,borderRadius:4, color: "gray", fontSize: 24 ,background:"white"}} />
          </SearchContainer></div>
        </Left>
        <Center>
        <Logo>SURESHOP INDIA</Logo>
        </Center>
        <Right>
        {user?
        
        !user.isAdmin?<><Link to="/orders">
          <MenuItem> MY ORDERS</MenuItem>
          </Link>
        
        
        <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={user.isAdmin?null:quantity} color="primary">
              <ShoppingCartOutlined />                 
            </Badge>
          </MenuItem>
          </Link></>:<Link to="/dashboard">
          <MenuItem>DASHBOARD</MenuItem>
          </Link>
          
          
          
          :null}
        {user?null:<Link to="/register">
          <MenuItem>REGISTER</MenuItem>
          </Link>}
         {user?<Link to="/">
          <Button onClick={()=>handleclick()}>LOG OUT</Button></Link>
           :<Link to="/login">
          <MenuItem>LOG IN</MenuItem>
          </Link>}
          
         
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
