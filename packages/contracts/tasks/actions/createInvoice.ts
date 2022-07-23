import {task} from "hardhat/config";
import type {TaskArguments} from "hardhat/types";

import {attach} from "../../utils/contracts";
import {loadJsonFile} from "../../utils/index";
import {InvoiceFactory} from "../../sctypes/contracts";

task("create:invoice")
  .addParam("client", "Client/Receiver address")
  .addParam("fractions", "fractions of invoice in existence")
  .addParam("repaymentAmount", "full repayment amount of invoice ")
  .addParam("invoiceURI", "invoice URI (ipfs)")
  .addOptionalParam("token", "token address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const {token: mockToken, invoiceFactory: factoryAddress} = loadJsonFile(`addresses.${hre.network.name}.json`);
    const {client, fractions, fractionalPrice, repaymentAmount, invoiceURI, token} = taskArguments;

    const invoiceFactory: InvoiceFactory = await attach(hre, "InvoiceFactory", factoryAddress);

    const {hash} = await invoiceFactory.createInvoice(
      client,
      fractions,
      fractionalPrice,
      repaymentAmount,
      invoiceURI,
      token || mockToken,
    );

    console.log("SUCCESS", hash);
  });
