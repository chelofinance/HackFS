import React from "react";
import type { NextPage } from "next";
import HomeComponent from "@components/home/Home";
import Info from "@components/home/infoSection";
import AboutUs from "@components/home/About";

const Home: NextPage = () => {
  return (
    <>
      <HomeComponent />
      <AboutUs />
      <Info />
    </>
  );
};

export default Home;
