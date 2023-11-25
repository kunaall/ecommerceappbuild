import styled from "styled-components";
import { categoryData } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
width: 65%;
display: grid;
padding: 120px;
grid-template-columns: 1fr 1fr 1fr;
gap: 20px;

${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {
  return (
    <Container>
      
      {categoryData.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
