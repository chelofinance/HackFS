import React from "react";
import type { NextPage } from "next";
import HomeComponent from "@components/home/Home";
import Info from "@components/home/infoSection";
import AboutUs from "@components/home/About";
import ContactUs from "@components/home/ContactUsForm";

const Home: NextPage = () => {
  return (
    <>
      <HomeComponent />
      <AboutUs />
      <Info />
      <ContactUs />
    </>
  );
};

export default Home;
