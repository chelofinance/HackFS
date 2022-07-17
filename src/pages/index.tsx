import React from "react";
import type { NextPage } from "next";
import HomeComponent from "@components/home/Home";
import About from "@components/home/About";

const Home: NextPage = () => {
  return (
    <>
      <HomeComponent />
      <About />
    </>
  );
};

export default Home;
