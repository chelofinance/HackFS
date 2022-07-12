import type {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {task} from "hardhat/config";
import type {TaskArguments} from "hardhat/types";

task("deploy:main")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, {ethers}) {});
