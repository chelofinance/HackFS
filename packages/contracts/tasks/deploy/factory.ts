import {task} from "hardhat/config";
import type {TaskArguments} from "hardhat/types";

import {deployProtocol} from "@utils/protocol";
import {writeJsonFile} from "@utils/index";

task("deploy:factory").setAction(async function (taskArguments: TaskArguments, hre) {
  const {erc20, invoice, factoring, invoiceFactory} = await deployProtocol(hre, true);

  writeJsonFile({
    path: `addresses.${hre.network.name}.json`,
    data: {
      token: erc20.address,
      invoice: invoice.address,
      factoring: factoring.address,
      invoiceFactory: invoiceFactory.address,
    },
  });
});
