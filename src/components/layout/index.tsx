import React from "react";
import {useRouter} from "next/router";

import {switchNetwork, addNetwork, connectMetamask} from "@helpers/index";
import Navbar from "@components/layout/Navbar";
import {onGetInvoices} from "@redux/actions";
import {useAppSelector, useAppDispatch} from "@redux/store";

const Layout: React.FunctionComponent<React.PropsWithChildren<{}>> = ({children}) => {
  const {data: invoices, loaded} = useAppSelector((state) => state.invoices);
  const {pathname} = useRouter();
  const dispatch = useAppDispatch();
  const onApp = pathname.indexOf("app") > -1;
  const loading = onApp && !loaded;

  const handleNetworkChange = async () => {
    try {
      await connectMetamask();
      await switchNetwork(137); //rinkeby
    } catch (err: any) {
      if (err.code === 4902)
        await addNetwork({
          chainId: 137,
          name: "Polygon",
          currency: {name: "MATIC", decimals: 18, symbol: "rETH"},
          rpcUrl: "https://polygon-rpc.com/",
        });
      else console.log({err});
    }
  };

  React.useEffect(() => {
    handleNetworkChange();
  }, []);

  React.useEffect(() => {
    if (onApp) dispatch(onGetInvoices());
  }, [onApp]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center font-montserrat h-screen w-full bg-gradient-to-b via-black from-blue-900/60 to-black text-white ">
        <img src="/logo.png" width="100px" className="animate-bounce opacity-70" />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex flex-row font-montserrat h-full bg-black text-white ">
        <div className="w-full h-full bg-no-repeat relative bg-gradient-to-b via-black from-blue-900/60 to-black">
          <div className="flex flex-col min-h-screen z-50">{children}</div>
        </div>
      </div>
      <footer className="flex h-24 w-full items-center justify-center bg-black text-white border-t-2 ">
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
