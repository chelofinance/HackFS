import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type {NextPage} from "next";
import {useRouter} from "next/router";

const HomeComponent: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="opacity-50 absolute z-0 top-0 h-screen w-full">
        <img src="/background.webp" className="w-full h-full" />
      </div>
      <div className="z-10 flex flex-col justify-center items-center w-full min-h-screen">
        <div className="flex justify-between items-center w-full pl-24 pr-36">
          <img src="/main_image.png" className="w-2/5" alt="" />
          <div className="w-1/3 flex flex-col items-end gap-10">
            <h1 className="text-6xl text-right font-bold">Invoice Loans system for Web3</h1>
            <span className="font-thin text-xl text-right">
              An open and reliable system to create loans for your invoices. It doesnt matter if you
              are a DAO, a Company or small business{" "}
            </span>
            <button
              onClick={() => router.push("/app")}
              className="rounded-md bg-blue-400 px-10 py-3 w-30 bg-gradient-to-b from-sky-500 to-blue-800"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
