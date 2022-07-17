import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type {NextPage} from "next";
import {uploadDirectory} from "@helpers/storage/ipfs";
import Card from "@components/common/card";
import clsx from "clsx";

const Info: NextPage = () => {
  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: (File | Object)[] = Array.from(event.target.files || []);
    const uploadContent = files.concat([{mynewObject: "is awesome", isAwesome: true}]);

    if (files.length <= 0) return;

    try {
      await uploadDirectory(uploadContent);
    } catch (err: any) {
      console.log({err});
    }
  };

  React.useEffect(() => {
    AOS.init();
  }, []);

  const about = [
    {
      className: "flex flex-row-reverse justify-between items-center w-full",
      dataAos: "fade-right",
      dataAosImage: "fade-left",
      left: true,
      title: "What is Invoice Factoring?",
      image: "/infoimage3.png",
      description:
        "Invoice factoring is a way for UK based businesses to raise money by selling invoices owed to your business to a third party factoringcompany at a discount. Factoring usually includes your own accounts receivable credit control, this is where the lender chases unpaid invoices up on your behalf. UK factoring companies help release cash from your debtor book. Here is everything you need to know about invoice factoring.",
    },
    {
      className: "flex justify-between items-center w-full",
      dataAos: "fade-left",
      dataAosImage: "fade-right",
      left: false,
      title: "How Does Factoring Work?",
      image: "/infoimage1.png",
      description:
        "For invoice factoring to work there must be a factor, a debtor and an unpaid invoice. The factor is the financial institution that offers or agrees to buy business debt or unpaid invoices. The debtor is the client who owes money to a business in the form of an unpaid invoice. Lastly, the invoice is the document that shows transactions between a business and its clients.",
    },
    // {
    //   className: "flex flex-row-reverse justify-between items-center w-full",
    //   dataAos: "fade-right",
    //   dataAosImage: "fade-left",
    //   left: true,
    //   title: "What is Invoice Factoring?",
    //   image: "/infoimage2.png",
    //   description:
    //     "Invoice factoring is a way for UK based businesses to raise money by selling invoices owed to your business to a third party factoringcompany at a discount. Factoring usually includes your own accounts receivable credit control, this is where the lender chases unpaid invoices up on your behalf. UK factoring companies help release cash from your debtor book. Here is everything you need to know about invoice factoring.",
    // },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <div className="w-full h-full absolute bottom-0 bg-gradient-to-br via-black from-black to-blue-900/60"></div>
      <div className="w-4/5 flex flex-col items-center justify-center gap-10 py-10">
        {about.map(({title, className, description, dataAos, dataAosImage, left, image}, i) => {
          return (
            <div className={className} key={i}>
              <img
                src={image}
                className="w-1/3 lg:block hidden"
                alt=""
                data-aos={dataAosImage}
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
              />
              <Card className="xl:w-1/2 lg:w-2/3 w-full bg-transparent text-white rounded-xl p-10">
                <div
                  className="gap-10 flex flex-col items-center justify-center min-h-[24rem]"
                  data-aos={dataAos}
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                >
                  <h2
                    className={clsx("text-sky-500 text-center font-bold text-2xl", {
                      ["lg:text-left"]: left,
                      ["lg:text-right"]: !left,
                    })}
                  >
                    {title}
                  </h2>
                  <p
                    className={clsx("text-primary text-center font-bold text-lg", {
                      ["lg:text-left"]: left,
                      ["lg:text-right"]: !left,
                    })}
                  >
                    {description}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
