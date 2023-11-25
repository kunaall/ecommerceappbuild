import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addproduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications"

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius:110px;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 8px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: start;
  padding-top:20px;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  
  border-radius:110px;

  &:hover ${Info}{
    opacity: 1;
  }
`;


const Image = styled.img`
  height: 80%;
  border-radius: 40px;
  z-index: 2;
  filter: drop-shadow(3px 3px 4px gray);

  
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const quantity=1;
  const colorr="green";
  const sizee="M";
 
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);

  const handleClick = () => {
   if(!user){NotificationManager.error('Please login to proceed!',"",2000)}
  else if(user.isAdmin){NotificationManager.error('Only customers can shop!',"",2000)}
  else{ 
    const {color,size,...rest}=item;
  const baseprod=rest;
  baseprod.color=colorr;
  baseprod.size=sizee;
  baseprod.quantity=quantity;
  addproduct(dispatch, {...baseprod,userid:user._id});}}
  
  
  
  return (
    <Container>
     
      <Image src={item.img} />
      <Info>
        <div onClick={handleClick}>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        </div>
        <Icon>
       
          <Link to={`/products/${item._id}`}>
          <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
