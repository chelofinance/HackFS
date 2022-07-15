// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IFactoring, InvoiceMeta } from "./interfaces/IFactoring.sol";
import { IInvoice } from "./interfaces/IInvoice.sol";

contract Factoring is IFactoring {
    IInvoice public invoice;
    mapping(uint256 => InvoiceMeta) public invoices;

    constructor(IInvoice _invoice) {
        invoice = _invoice;
    }

    function setInvoice(uint256 invoiceID) public {
        invoices[invoiceID] = InvoiceMeta(false);
    }

    function approveInvoice(uint256 invoiceID) public {
        require(invoice.receiverOf(invoiceID) == msg.sender, "Factoring:only client approves invoice");
        invoices[invoiceID].isActive = true;
    }
}
