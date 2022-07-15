// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IInvoice } from "./interfaces/IInvoice.sol";

contract InvoiceFactory {
    IInvoice public invoice;
    address public factoring;

    uint256 public idCount;

    constructor(address _factoring) {
        factoring = _factoring;
    }

    function createInvoice(
        address client,
        uint256 fractions,
        uint256 fractionalPrice,
        string memory invoiceURI
    ) external {
        uint256 tokenID = idCount++;

        invoice.mint(client, tokenID, fractions, "");
        invoice.setURI(tokenID, invoiceURI);
    }
}
