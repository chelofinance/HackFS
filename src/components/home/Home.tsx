import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import { uploadDirectory } from "@helpers/storage/ipfs";
import Card from "@components/common/card";

const HomeComponent: NextPage = () => {
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
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="opacity-50 absolute z-0 top-0 h-screen w-full">
        <img src="/background.webp" className="w-full h-full" />
      </div>
      <div className="z-10 flex flex-col justify-center items-center w-full min-h-screen">
        <div className="flex justify-between items-center w-full md:pl-24 md:pr-36 pr-24 pl-24">
          <img
            src="/main_image.png"
            className="xl:w-2/5 w-3/5 md:block hidden"
            alt=""
          />
          <div className="md:w-1/3 w-full flex flex-col md:items-end items-center gap-10">
            <h1 className="xl:text-6xl md:text-4xl text-5xl md:text-right text-center font-bold">
              Invoice Loans system for Web3
            </h1>
            <span className="font-thin text-xl md:text-right text-center">
              An open and reliable system to create loans for your invoices. It
              doesnt matter if you are a DAO, a Company or small business{" "}
            </span>
            <button className="rounded-md bg-blue-400 px-10 py-3 w-30 bg-gradient-to-b from-sky-500 to-blue-800">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
