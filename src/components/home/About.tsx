import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import { uploadDirectory } from "@helpers/storage/ipfs";
import Card from "@components/common/card";
import clsx from "clsx";

const AboutUs: NextPage = () => {
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
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full h-full absolute bottom-0 bg-gradient-to-br via-black from-blue-900/60 to-black"></div>
      <div className="w-3/4 flex flex-col items-center justify-center gap-10 py-10">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
        >
          <Card className="w-full bg-transparent  text-white rounded-xm border border-sky-500 overflow-hidden relative">
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <div className="gap-16 flex flex-col items-center justify-center py-16 px-28 relative">
              <h2
                className={clsx("text-sky-500 text-center font-bold text-3xl")}
              >
                Why you should choose us?
              </h2>
              <p className={clsx("text-white text-center font-bold text-xl")}>
                We are a decentralized platform that offers an easy and user
                friendly process to create invoices powered by Web3 NFT
                Technology. <br />
                <br />
                Those invoices can be sold in an open market, increasing your
                chances to get fast capital.
                <br />
                <br />
                If the invoice price is too big for only 1 payment, dont worry
                about it, with DAOFactoring you'll be able to create
                fractionalized invoices in order to facilitate the purchase of
                invoices by institutional and retail investors.
              </p>
              <div className="rounded-full border-4 border-white p-10 pt-8">
                <img src="/logo.png" className="h-52" alt="" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
