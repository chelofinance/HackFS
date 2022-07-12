import React from "react";
import {useRouter} from "next/router";

import {switchNetwork, addNetwork} from "@helpers/index";
import Navbar from "@components/layout/Navbar";

const Layout: React.FunctionComponent<React.PropsWithChildren<{}>> = ({children}) => {
  const router = useRouter();

  const handleNetworkChange = async () => {
    try {
      await switchNetwork(4); //rinkeby
    } catch (err: any) {
      if (err.code === 4902)
        await addNetwork({
          chainId: 4,
          name: "Rinkeby testnet",
          currency: {name: "RinkebyETH", decimals: 18, symbol: "rETH"},
          rpcUrl: "https://rinkeby.infura.io/v3/",
        });
      else console.log({err});
    }
  };

  React.useEffect(() => {
    handleNetworkChange();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row font-montserrat h-full bg-black text-white bg-gradient-to-b via-black from-blue-900 to-black">
        <div className="w-full h-full p-4 bg-no-repeat relative">
          <div className="z-50">{children}</div>
        </div>
      </div>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
        </a>
      </footer>
    </>
  );
};

export default Layout;
