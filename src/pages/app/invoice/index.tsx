import React from "react";
import {useRouter} from "next/router";

import {Card} from "@components/common/card";
import {useAppSelector} from "@redux/store";

const InvoiceDetail: React.FunctionComponent<{}> = () => {
  const router = useRouter();
  const {data} = useAppSelector((state) => state.invoices);
  const {invoice, index} = React.useMemo(() => {
    const index = data.findIndex((inv) => inv.id == router.query.id);

    if (index < 0) router.push("/app");

    return {index, invoice: data[index]};
  }, [data]);

  return (
    <div className="h-full flex flex-col items-center py-28">
      <div className="w-full h-full px-20">
        <h2 className="text-4xl font-thin mb-4">Invoice #{index}</h2>
        <div className="flex gap-4">
          <Card className="w-60">Issuer: Kali DAO</Card>
          <Card className="w-60">
            Status: <span className="text-green-400">Active</span>
          </Card>
        </div>
        <div className="mt-10">
          <Card className="w-80 flex flex-col">
            <h4 className="text-xl font-thin mb-5">Stats:</h4>
            <div className="flex flex-col mb-5">
              <span className="font-medium text-gray-400">Share/Token:</span>
              <span className="text-3xl font-normal">100</span>
            </div>
            <div className="flex flex-col mb-5">
              <span className="font-medium text-gray-400">Total Supply</span>
              <span className="text-3xl font-normal">400000</span>
            </div>
            <div className="flex flex-col mb-5">
              <span className="font-medium text-gray-400">Purchases</span>
              <span className="text-3xl font-normal">30</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
