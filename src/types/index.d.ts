declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

interface Invoice {
  id: string;
  uri: string;
  totalSupply: string;
  issuer: string;
  receiver: string;
  status: 0 | 1 | 2;
  fractionalPrice: string;
  repaymentAmount: string;
  discount: string;
  token: {
    address: string;
    decimals: number;
    symbol: string;
  };
}
