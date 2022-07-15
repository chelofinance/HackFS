// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IInvoice } from "./interfaces/IInvoice.sol";
import { IFactoring } from "./interfaces/IFactoring.sol";

contract InvoiceFactory {
    IInvoice public invoice;
    IFactoring public factoring;

    uint256 public idCount;

    constructor(IFactoring _factoring) {
        factoring = _factoring;
    }

    function createInvoice(
        address client,
        uint256 fractions,
        uint256 fractionalPrice,
        string memory invoiceURI
    ) external {
        uint256 tokenID = idCount++;

        invoice.mint(msg.sender, tokenID, fractions, abi.encode(client, invoiceURI));
        factoring.setInvoice(tokenID);
    }
}
