import {ethers} from "ethers";

export const getMockInvoices = (): Invoice[] => {
  const randTokenName = (size: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ans = "";
    for (let i = 0; i < size; i++)
      ans += characters.charAt(Math.floor(Math.random() * characters.length));

    return ans.toUpperCase();
  };

  function randomMonthDate() {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  return new Array(20).fill(0).map((el, id) => {
    const randZeros = (max: number) => String(10 ** max).replace("1", "");

    const totalSupply = `100${randZeros(4)}`;
    const fractionalPrice = `${Math.floor(Math.random() * 10 + 1)}000000000000000000${randZeros(
      4
    )}`;
    return {
      totalSupply,
      fractionalPrice,
      id: String(id),
      uri: "ipfs://bafybeidqymisza5rarnc6phx3jovi4i55bopcfkwgo2de4a5jb2gzil2ru",
      issuer: ethers.Wallet.createRandom().address,
      receiver: ethers.Wallet.createRandom().address,
      status: Math.floor((Math.random() * 10) % 3) as 0 | 1 | 2,
      amountRepaid: "0",
      repaymentAmount: ethers.BigNumber.from(totalSupply).mul(fractionalPrice).toString(),
      date: randomMonthDate().getTime(),
      discount: String(Math.random() * 10),
      token: {
        address: ethers.Wallet.createRandom().address,
        decimals: 18,
        symbol: randTokenName(6),
      },
    };
  });
};

export const timeout = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
