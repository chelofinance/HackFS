import {BigNumberish} from "ethers";
import fs from "fs";
import {HardhatRuntimeEnvironment} from "hardhat/types";

export const loadJsonFile = (file: string) => {
  const appRoot = require("app-root-path");
  try {
    const data = fs.readFileSync(appRoot + "/packages/contracts/" + file);
    return JSON.parse(data as any);
  } catch (err) {
    console.log("ERR", err);
    return {};
  }
};

export const writeJsonFile = (args: {path: string; data: Object}) => {
  const appRoot = require("app-root-path");
  const prevData = loadJsonFile(args.path);
  const parsedData = JSON.stringify(
    {
      ...prevData,
      ...args.data,
    },
    null,
    2,
  );
  console.log("Writting", appRoot + "/packages/contracts/" + args.path);
  console.log(parsedData);
  fs.writeFileSync(appRoot + "/packages/contracts/" + args.path, parsedData);
};

export const increaseTime = async (hre: HardhatRuntimeEnvironment, time: BigNumberish) => {
  const {network} = hre;
  await network.provider.send("evm_increaseTime", [time]);
  await network.provider.send("evm_mine");
};
