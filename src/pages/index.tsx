import type { NextPage } from "next";
import { uploadDirectory } from "@helpers/storage/ipfs";
import { Card } from "@components/Card";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home: NextPage = () => {
  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: (File | Object)[] = Array.from(event.target.files || []);
    const uploadContent = files.concat([
      { mynewObject: "is awesome", isAwesome: true },
    ]);

    if (files.length <= 0) return;

    try {
      await uploadDirectory(uploadContent);
    } catch (err: any) {
      console.log({ err });
    }
  };

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start ">
      <div className="opacity-50 absolute z-0 top-0">
        <img src="/background.webp" className="w-full h-full" />
      </div>
      <div className="z-10 flex flex-col justify-center items-center w-full min-h-screen">
        <div className="flex justify-between items-center w-full pl-24 pr-36">
          <img src="/main_image.png" className="w-1/2" alt="" />
          <div className="w-1/3 flex flex-col items-end gap-10">
            <h1 className="text-6xl text-right font-bold">
              Invoice Loans system for Web3
            </h1>
            <span className="font-thin text-xl text-right">
              An open and reliable system to create loans for your invoices. It
              doesnt matter if you are a DAO, a Company or small business{" "}
            </span>
            <button className="rounded-md bg-blue-400 px-10 py-3 w-30 bg-gradient-to-b from-sky-500 to-blue-800">
              Get started
            </button>
          </div>
        </div>
      </div>
      <div
        className="h-screen w-full flex flex-wrap items-center justify-between"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <Card>Some content</Card>
        <Card>Some content</Card>
        <Card>Some content</Card>
        <Card>Some content</Card>
        <Card>Some content</Card>
      </div>
    </div>
  );
};

export default Home;
