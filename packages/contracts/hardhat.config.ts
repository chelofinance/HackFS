import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import {config as dotenvConfig} from "dotenv";
import "hardhat-gas-reporter";
import {HardhatUserConfig} from "hardhat/config";
import {resolve} from "path";
import "solidity-coverage";

import "./tasks/deploy";

dotenvConfig({path: resolve(__dirname, "./.env")});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {},
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.15",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "sctypes",
    target: "ethers-v5",
  },
};

export default config;
