import {evmcl} from "@1hive/evmcrispr";
import {getProvider} from "@helpers/index";

export const execByDao = async (args: {
  dao: string;
  transactions: {
    to: string;
    signature: string;
    args: unknown[];
  }[];
}) => {
  const {dao, transactions} = args;
  const signer = getProvider().getSigner();
  const txString = transactions
    .map(
      (tx) =>
        `act agent ${tx.to} ${tx.signature} ${tx.args
          .map((arg) => (Array.isArray(arg) ? `[${arg.join(",")}]` : `${arg}`))
          .join(" ")}`
    )
    .join("\n");
  console.log({transactions, dao});
  const evm = evmcl`
   connect ${dao} token-manager voting
   ${txString}
  `;
  await evm.forward(signer);
};
