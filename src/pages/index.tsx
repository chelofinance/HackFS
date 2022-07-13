import type {NextPage} from "next";
import {uploadDirectory} from "@helpers/storage/ipfs";
import Card from "@components/common/card";

const Home: NextPage = () => {
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

  return (
    <div className="flex h-full flex-col items-center justify-start ">
      <div className="opacity-50 absolute z-0 top-0">
        <img src="/background.webp" className="w-full h-full" />
      </div>
      <div className="z-10 flex flex-col justify-start items-start w-full py-60 px-20">
        <div className="w-1/3 flex flex-col items-start gap-10">
          <h1 className="text-6xl font-bold">Invoice Loans system for Web3</h1>
          <span className="font-thin text-xl">
            An open and reliable system to create loans for your invoices. It doesnt matter if you
            are a DAO, a Company or small business{" "}
          </span>
          <button className="rounded-md bg-blue-400 px-10 py-3 w-30 bg-gradient-to-b from-sky-500 to-blue-800">
            Get started
          </button>
        </div>
      </div>
      <div className="h-screen w-full">
        <Card> Some content</Card>
      </div>
    </div>
  );
};

export default Home;
