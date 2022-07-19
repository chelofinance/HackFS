// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IInvoiceFactory {
    event InvoiceCreated(uint256 tokenID);

    function createInvoice(
        address client,
        uint256 fractions,
        uint256 fractionalPrice,
        uint256 repaymentAmount,
        string memory invoiceURI,
        IERC20 token
    ) external;
}
