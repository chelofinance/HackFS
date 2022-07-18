import React from "react";
import { useRouter } from "next/router";

import { Card } from "@components/common/card";
import { useAppSelector } from "@redux/store";
import DataTable from "@components/common/table";
import Chart from "@components/common/chart";

const InvoiceDetail: React.FunctionComponent<{}> = () => {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.invoices);
  const { invoice, index } = React.useMemo(() => {
    const index = data.findIndex((inv) => inv.id == router.query.id);

    if (index < 0) router.push("/app");

    return { index, invoice: data[index] };
  }, [data]);

  const { data: invoices } = useAppSelector((state) => state.invoices);

  return (
    <div className="h-full flex flex-col items-center py-28">
      <div className="w-full h-full px-20">
        <h2 className="text-4xl font-thin mb-4">Invoice #{index}</h2>
        <div className="flex lg:flex-row flex-col gap-10">
          <div className="flex flex-col gap-4 lg:w-1/3 w-full">
            <div className="flex xl:flex-row flex-col gap-4">
              <Card className="xl:w-1/2 w-full">Issuer: Kali DAO</Card>
              <Card className="xl:w-1/2 w-full">
                Status: <span className="text-green-400">Active</span>
              </Card>
            </div>
            <div className="xl:mt-10">
              <Card className="w-full">
                <h4 className="text-xl font-thin mb-5">Stats:</h4>
                <div className="flex flex-wrap">
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">
                      Share/Token:
                    </span>
                    <span className="text-3xl font-normal">100</span>
                  </div>
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">
                      Total Supply
                    </span>
                    <span className="text-3xl font-normal">400000</span>
                  </div>
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">Purchases</span>
                    <span className="text-3xl font-normal">30</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:w-2/3 w-full">
            <Chart
              data={invoices.map(({ date, amountRepaid }) => ({
                xAxis: new Date(date).toLocaleString().split(",")[0],
                yAxis: Number(amountRepaid.slice(0, -18)),
              }))}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-20 mt-16">
        <h2 className="text-2xl font-thin mb-4">Transactions</h2>
        <DataTable
          headers={[
            { title: "Invoice #", value: "Invoice #" },
            { title: "Total Value", value: "Total Value" },
            { title: "Token Amount", value: "Token Amount" },
            { title: "Fractions", value: "Fractions" },
            { title: "Account", value: "Account" },
            { title: "Time", value: "Time" },
          ]}
          data={[]}
        />
      </div>
    </div>
  );
};

export default InvoiceDetail;
