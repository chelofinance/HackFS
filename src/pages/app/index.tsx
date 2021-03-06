import React from "react";
import {useRouter} from "next/router";

import Card from "@components/common/card";
import Table from "@components/common/table";
import Chart from "@components/common/chart";
import {useAppSelector} from "@redux/store";
import {formatValueWithDecimals} from "@helpers/erc";

const INVOICE_HEADERS = [
  {title: "#", value: "id"},
  {title: "Total supply", value: "totalSupply"},
  {title: "Price/Share", value: "fractionalPrice"},
  {title: "Issuer", value: "issuer"},
  {title: "Receiver", value: "receiver"},
  {title: "Status", value: "status"},
  {title: "Repaid", value: "amountRepaid"},
  {title: "Issue date", value: "date"},
  {title: "Interest", value: "discount"},
  {title: "Token", value: "token"},
];

const App: React.FunctionComponent<{}> = () => {
  const router = useRouter();
  const {data: invoices} = useAppSelector((state) => state.invoices);
  const viewData = React.useMemo(() => {
    const parseAddress = (add: string) => `${add.slice(0, 5)}...${add.slice(-5)}`;

    return invoices.map((inv, i) => ({
      id: i + 1,
      rawId: inv.id,
      totalSupply: inv.totalSupply,
      repaymentAmount: formatValueWithDecimals({
        value: inv.repaymentAmount,
        maxDecimals: 2,
        decimals: 6,
      }),
      fractionalPrice: formatValueWithDecimals({
        value: inv.fractionalPrice,
        maxDecimals: 2,
        decimals: 6,
      }),
      issuer: parseAddress(inv.issuer),
      receiver: parseAddress(inv.receiver),
      status: inv.status === 0 ? "Created" : inv.status === 1 ? "Active" : "Finished",
      rawStatus: inv.status,
      amountRepaid: formatValueWithDecimals({
        value: inv.amountRepaid,
        maxDecimals: 2,
        decimals: 6,
      }),
      date: new Date(inv.date).toLocaleString().split(",")[0],
      rawDate: inv.date,
      discount: `${inv.discount}%`,
      rawDiscount: Number(inv.discount),
      token: inv.token.symbol,
    }));
  }, [invoices]);

  return (
    <div className="h-full flex flex-col items-center py-28">
      <div className="w-3/4 h-full">
        <h2 className="text-2xl text-gray-300 mb-5">Overview</h2>
        <div className="flex justify-center mb-20 w-full gap-10">
          <Card className="w-1/2 h-80">
            <h3 className="text-xl font-thin">Invoices by volume</h3>
            <Chart
              data={viewData.map(({rawDate, repaymentAmount}) => ({
                xAxis: new Date(rawDate).toLocaleString().split(",")[0],
                yAxis: Number(repaymentAmount),
              }))}
            />
          </Card>
          <Card className="w-1/2 h-80">
            <h3 className="text-xl font-thin">Repayments</h3>
            <Chart
              data={viewData.map(({rawDate, amountRepaid}) => ({
                xAxis: new Date(rawDate).toLocaleString().split(",")[0],
                yAxis: Number(amountRepaid),
              }))}
            />
          </Card>
        </div>
        <div className="w-full">
          {
            //to make tailwind colors preload
          }
          <div className="text-blue-400 text-green-400 text-red-500"></div>
          <Table
            classes={{root: "w-full"}}
            data={viewData}
            headers={INVOICE_HEADERS}
            setSelected={({rawId}: any) =>
              router.push({
                pathname: "/app/invoice",
                query: {id: rawId},
              })
            }
            custom={{
              discount: ({discount, rawDiscount}: any) => (
                <span className={`text-${rawDiscount < 0 ? "red-500" : "green-400"}`}>
                  {discount}
                </span>
              ),
              status: ({rawStatus, status}: any) => (
                <span
                  className={`text-${rawStatus === 0 ? "blue-400" : rawStatus === 1 ? "green-400" : "red-500"
                    }`}
                >
                  {status}
                </span>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
