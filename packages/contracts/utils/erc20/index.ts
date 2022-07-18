import {expect} from "chai";
import {Signer, BigNumberish} from "ethers";
import {MockERC20} from "@sctypes/index";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Mint `amount` tokens for `to`
 */
export const mint = async (token: MockERC20, signer: Signer, to: string, amount: BigNumberish): Promise<void> => {
  const preBalance = await token.balanceOf(to);

  await expect(token.connect(signer).mint(to, amount)).to.emit(token, "Transfer").withArgs(ZERO_ADDRESS, to, amount);

  const postBalance = await token.balanceOf(to);
  expect(postBalance.sub(preBalance)).to.equal(amount);
};

/**
 * approve `amount` tokens for `to` from `from`
 */
export const approve = async (
  token: MockERC20,
  sender: Signer,
  toAddress: string,
  amount: BigNumberish,
): Promise<void> => {
  const senderAddress = await sender.getAddress();
  const preApproval = await token.allowance(senderAddress, toAddress);

  await expect(token.connect(sender).approve(toAddress, amount))
    .to.emit(token, "Approval")
    .withArgs(senderAddress, toAddress, amount);

  const postApproval = await token.allowance(senderAddress, toAddress);
  expect(postApproval.sub(preApproval)).to.equal(amount);
};
