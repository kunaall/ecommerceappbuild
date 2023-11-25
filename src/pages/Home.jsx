import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: 780;
  text-align: center;
  color:black;
  font-size: 35px;
  filter: drop-shadow(0px 0px 2px gray);
`;
const Home = () => {
  return (
    <div>
      <Announcement />
     <Navbar />
      <Slider />
      <Categories />
      <Title>SOME TOP PRODUCTS</Title>
      <Products cat={false} filters={false} sort={false}/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
