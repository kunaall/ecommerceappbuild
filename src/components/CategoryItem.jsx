import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
display: flex;
flex: 1;
margin: 20px;
height: 400px;
width: 300px;
padding-top: 10px;
justify-content: center;
transition: transform .3s;
align-items: center;
position: relative;


filter: drop-shadow(3px 3px 4px gray);


&:hover {
  transform: scale(1.05); 
}
 
`;

const Image = styled.img`
height: 410px;
width: 310px;
border-radius:8px;
object-fit: cover;
${mobile({ height: "20vh" })}

`;

const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap:50px;
 
`;

const Title = styled.h1`
color:rgb(255, 255, 255) ;
font-weight: 780;
margin-bottom: 20px;
`;

const Button = styled.button`
border: 1px solid ;
border-radius:4px;
padding: 13px;
background-color: white;

color:black   ;
cursor: pointer;
font-weight: 600;
    &:hover {
      background-color: lightblue;
    }
`;

const CategoryItem = ({ item }) => {
  
  return (
    <Container>
     
      
      <Link to={`/products/categories/${item.categories}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
