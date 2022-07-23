import React from "react";
import {useRouter} from "next/router";

import {Card} from "@components/common/card";
import {Input} from "@components/common/form/input";
import Modal from "@components/common/modal";
import {useAppSelector} from "@redux/store";
import DataTable from "@components/common/table";
import Chart from "@components/common/chart";
import {Button} from "@components/common/button";

import {approveInvoice, buyInvoices, repayInvoice, withdrawRewards} from "@helpers/factoring";
import {formatValueWithDecimals} from "@helpers/erc";
import {toBN} from "@helpers/index";
import {cidToHttp, downloadFile, getFolderList} from "@helpers/storage/ipfs";

const InvoiceDetail: React.FunctionComponent<{}> = () => {
  const [{buy, repay}, setModal] = React.useState({buy: false, repay: false});
  const [downloadFiles, setDownloadFiles] = React.useState<string[]>([]);
  const router = useRouter();
  const {data: invoices} = useAppSelector((state) => state.invoices);
  const {invoice, index} = React.useMemo(() => {
    const index = invoices.findIndex((inv) => inv.id == router.query.id);

    if (index < 0) router.push("/app");

    return {index, invoice: invoices[index]};
  }, [invoices]);

  const toggleBuySharesModal = (open?: boolean) => {
    setModal({buy: open != undefined ? open : !buy, repay});
  };

  const toggleRepayInvoiceModal = (open?: boolean) => {
    setModal({repay: open != undefined ? open : !repay, buy});
  };

  const downloadAttachments = async () => {
    const folderList = (await getFolderList(invoice.uri.split("/").reverse()[0])).map(
      ({cid, name}) => ({url: cidToHttp(cid.toString()), name})
    );
    const files = await Promise.all(folderList.map(({url, name}) => downloadFile(url, name)));
  };

  const handleWithdrawRewards = async () => {
    await withdrawRewards({invoiceId: String(index)});
  };

  const handleApproveInvoice = async () => {
    try {
      await approveInvoice({invoiceId: String(index)});
    } catch (err: any) {
      console.log({err});
    }
  };

  return (
    <div className="h-full flex flex-col items-center py-28">
      <div style={{display: "none"}}>
        {downloadFiles.map((fil) => (
          <iframe src={fil} />
        ))}
      </div>
      <div className="w-full h-full px-20">
        <h2 className="text-4xl font-thin mb-4">Invoice #{index + 1}</h2>
        <div className="flex lg:flex-row flex-col gap-10">
          <div className="flex flex-col gap-4 lg:w-1/3 w-full">
            <div className="flex xl:flex-row flex-col gap-4">
              <Card className="xl:w-1/2 w-full">Issuer: Kali DAO</Card>
              <Card className="xl:w-1/2 w-full">
                Status:{" "}
                <span
                  className={`text-${invoice.status === 0 ? "blue" : invoice.status === 1 ? "green" : "red"
                    }-400`}
                >
                  {invoice.status === 0 ? "Created" : invoice.status === 1 ? "Active" : "Repaid"}
                </span>
              </Card>
            </div>
            <div className="xl:mt-10">
              <Card className="w-full">
                <h4 className="text-xl font-thin mb-5">Stats:</h4>
                <div className="flex flex-wrap">
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">Share/Token:</span>
                    <span className="text-3xl font-normal">
                      {formatValueWithDecimals({
                        decimals: 6,
                        value: invoice.fractionalPrice,
                        maxDecimals: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">Total Supply</span>
                    <span className="text-3xl font-normal">{invoice.totalSupply}</span>
                  </div>
                  <div className="flex flex-col mb-5 w-40">
                    <span className="font-medium text-gray-400">Purchases</span>
                    <span className="text-3xl font-normal">{invoice.purchases.length}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:w-2/3 w-full">
            <div className="text-center">
              <h2 className="text-2xl font-thin mb-1">Purchases Volume</h2>
            </div>
            <div className="h-5/6 pt-1">
              <Chart
                data={invoice.purchases.map(({amount, timestamp}) => ({
                  xAxis: new Date(Number(timestamp) * 1000).toLocaleString().split(",")[0],
                  yAxis: toBN(amount).mul(invoice.fractionalPrice).toNumber(),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-20 mt-16">
        <h2 className="text-2xl font-thin mb-4">Purchases</h2>
        <DataTable
          headers={[
            {title: "#", value: "id"},
            {title: "Token Amount", value: "price"},
            {title: "Fractions", value: "amount"},
            {title: "Account", value: "buyer"},
            {title: "Time", value: "date"},
          ]}
          data={invoice.purchases.map((a, id) => ({
            id: id + 1,
            amount: a.amount,
            buyer: a.buyer,
            price: toBN(invoice.fractionalPrice).mul(a.amount).toString(),
            date: "some data",
          }))}
        />
      </div>
      <div className="w-full h-full px-20 mt-16">
        <div className="flex justify-around lg:flex-row flex-col gap-10">
          <div className="flex flex-col gap-4 lg:w-1/3 w-full">
            <div className="text-center">
              <h2 className="text-2xl font-thin mb-6">Download Attachments</h2>
            </div>
            <div className="grid content-center">
              <Button
                className="rounded-md px-4 py-2 bg-gray-800/60 w-1/3 whitespace-nowrap"
                onClick={downloadAttachments}
              >
                Download
              </Button>
            </div>
          </div>
          {invoice.status === 1 && (
            <div className="flex flex-col gap-4 lg:w-1/3 w-full">
              <div className="text-center">
                <h2 className="text-2xl font-thin mb-6">Buy Shares</h2>
              </div>
              <div className="grid content-center">
                <Button
                  className="rounded-md px-4 py-2 bg-gray-800/60 w-1/3"
                  onClick={toggleBuySharesModal as any}
                >
                  Buy
                </Button>
              </div>
            </div>
          )}
          {invoice.status === 1 && (
            <div className="flex flex-col gap-4 lg:w-1/3 w-full">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-thin mb-1">Repay Invoice</h2>
                <p className="text-xs font-thin">
                  <b>*Only for invoice recievers*</b>
                </p>
              </div>
              <div className="grid content-center">
                <Button
                  className="rounded-md px-4 py-2 bg-gray-800/60 w-1/3"
                  onClick={toggleRepayInvoiceModal as any}
                >
                  Pay
                </Button>
              </div>
            </div>
          )}
          {invoice.status === 0 && (
            <div className="flex flex-col gap-4 lg:w-1/3 w-full">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-thin mb-1">Approve Invoice</h2>
                <p className="text-xs font-thin">
                  <b>*Only for invoice recievers*</b>
                </p>
              </div>
              <div className="grid content-center">
                <Button
                  className="rounded-md px-4 py-2 bg-gray-800/60 w-1/3"
                  onClick={handleApproveInvoice}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-20 mt-16">
        <Card className="w-1/2" render={invoice.status === 2}>
          <div className="grid content-center">
            <Button
              className="rounded-md px-4 py-2 bg-gray-800/60 w-1/3 whitespace-nowrap"
              onClick={handleWithdrawRewards}
            >
              <b>Withdraw Rewards!</b>
            </Button>
          </div>
        </Card>
        <BuyModal
          open={buy}
          setOpen={toggleBuySharesModal}
          priceByShare={invoice.fractionalPrice}
          tokenSymbol={invoice.token.symbol}
          invoiceId={invoice.id}
        />
        <RepayInvoiceModal
          open={repay}
          setOpen={toggleRepayInvoiceModal}
          repaymentAmount={invoice.repaymentAmount}
          tokenSymbol={invoice.token.symbol}
          invoiceId={invoice.id}
        />
      </div>
    </div>
  );
};

const BuyModal: React.FunctionComponent<{
  open: boolean;
  setOpen: Function;
  priceByShare: string;
  tokenSymbol: string;
  invoiceId: string;
}> = ({open, setOpen, priceByShare, tokenSymbol, invoiceId}) => {
  const [shares, setShares] = React.useState<number | undefined>();
  const price = Number(priceByShare) * (shares || 0);

  const buyShares = async () => {
    try {
      if (shares)
        await buyInvoices({invoiceId, fractions: shares.toString(), price: `${price}000000`});
    } catch (err: any) {
      console.log({err});
    }
  };

  return (
    <Modal open={open} setModal={setOpen}>
      <h4 className="text-xl">Buy shares</h4>
      <div className="flex items-center">
        <Input
          name=""
          placeholder="Amount"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          rightImg={
            <span className="text-lg whitespace-nowrap mx-10">{`Price: ${price}  ${tokenSymbol}`}</span>
          }
        />
        <Button colored className="py-2 px-6 mx-10" onClick={buyShares}>
          Buy
        </Button>
      </div>
    </Modal>
  );
};

const RepayInvoiceModal: React.FunctionComponent<{
  open: boolean;
  setOpen: Function;
  repaymentAmount: string;
  tokenSymbol: string;
  invoiceId: string;
}> = ({open, setOpen, repaymentAmount, tokenSymbol, invoiceId}) => {
  const [repayment, setRepayment] = React.useState<number | undefined>();
  const price = Number(repaymentAmount) * (repayment || 0);

  const repay = async () => {
    try {
      await repayInvoice({invoiceId, amount: String(repayment)});
    } catch (err: any) {
      console.log({err});
    }
  };

  return (
    <Modal open={open} setModal={setOpen}>
      <h4 className="text-xl">Repay</h4>
      <div className="flex items-center">
        <Input
          name=""
          placeholder="Amount"
          value={repayment}
          onChange={(e) => setRepayment(Number(e.target.value))}
          rightImg={
            <span className="text-lg whitespace-nowrap mx-10">{`Amount: ${repaymentAmount}`}</span>
          }
        />
        <Button colored className="py-2 px-6 mx-10" onClick={repay}>
          Pay
        </Button>
      </div>
    </Modal>
  );
};

export default InvoiceDetail;
