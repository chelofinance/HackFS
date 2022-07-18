import {expect} from "chai";
import {Artifact, HardhatRuntimeEnvironment} from "hardhat/types";
import {BigNumber, Contract, Signer, ContractTransaction} from "ethers";
import {ContractReceipt} from "@ethersproject/contracts";
import {LogDescription} from "@ethersproject/abi";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

export async function deploy<T extends Contract>(
  hardhat: HardhatRuntimeEnvironment,
  contractName: string,
  deployer: Signer,
  params: any[],
): Promise<T> {
  const {deployContract} = hardhat.waffle;
  const artifact: Artifact = await hardhat.artifacts.readArtifact(contractName);
  return <T>await deployContract(deployer, artifact, params);
}

export async function attach<T extends Contract>(
  hardhat: HardhatRuntimeEnvironment,
  contractName: string,
  address: string,
): Promise<T> {
  const {ethers} = hardhat;
  return <T>(await ethers.getContractFactory(contractName)).attach(address);
}

export const getLogs = (contract: Contract, transaction: ContractReceipt) => {
  const response: LogDescription[] = [];
  transaction.logs.forEach((log: {topics: string[]; data: string; address: string}) => {
    try {
      if (log.address === contract.address) response.push(contract.interface.parseLog(log));
    } catch (err: unknown) {
      console.log({err});
    }
  });
  return response;
};

export const expectLogs = (logs: LogDescription[], logName: string, args: (string | BigNumber)[][]) => {
  const bigNumberParser = (a: string | BigNumber) => (typeof a === "object" ? a.toString() : a);
  const matchLogs = logs.filter(lg => lg.name === logName);

  expect(matchLogs.length === args.length, "ExpectLogs: logs amount mismatch");
  matchLogs.forEach((lg, i) => {
    const logArgs = lg.args.map(bigNumberParser);
    expect(logArgs).to.eql(args[i].map(bigNumberParser), "ExpectLogs: unexpected log value");
  });
};

export const getReceipt = async (tx: Promise<ContractTransaction>) => await (await tx).wait();

export async function deployBehindProxy(
  hre: HardhatRuntimeEnvironment,
  implName: string,
  signer: SignerWithAddress,
  args: any[],
  impl?: Contract,
) {
  const factory = await hre.ethers.getContractFactory(implName);
  if (!impl) impl = await factory.connect(signer).deploy();
  const init = (await impl.connect(signer).populateTransaction.initialize(...args)).data as string;
  const proxy = await (await hre.ethers.getContractFactory("ERC1967Proxy")).connect(signer).deploy(impl.address, init);
  const instance = factory.attach(proxy.address);
  return instance;
}
