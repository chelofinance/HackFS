import Factoring from "../artifacts/contracts/Factoring.sol/Factoring.json";
import Invoice from "../artifacts/contracts/Invoice.sol/Invoice.json";
import InvoiceFactory from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import ERC1155 from "../artifacts/contracts/mocks/ERC1155.sol/MockERC1155.json";
import ERC20 from "../artifacts/contracts/mocks/ERC20.sol/MockERC20.json";

export default {
  InvoiceFactory: InvoiceFactory.abi,
  Invoice: Invoice.abi,
  Factoring: Factoring.abi,
  ERC1155: ERC1155.abi,
  ERC20: ERC20.abi,
};
