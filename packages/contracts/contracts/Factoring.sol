// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IFactoring, InvoiceMeta, Status } from "./interfaces/IFactoring.sol";
import { IInvoice } from "./interfaces/IInvoice.sol";

contract Factoring is IFactoring {
    IInvoice public invoice;
    mapping(uint256 => InvoiceMeta) public invoices;

    constructor(IInvoice _invoice) {
        invoice = _invoice;
    }

    function setInvoice(
        uint256 invoiceID,
        uint256 fractionalPrice,
        address issuer,
        address receiver,
        IERC20 token
    ) public {
        invoices[invoiceID] = InvoiceMeta(Status.Created, fractionalPrice, 0, issuer, receiver, token);
    }

    function approveInvoice(uint256 invoiceID) public {
        InvoiceMeta memory metadata = invoices[invoiceID];
        require(metadata.receiver == msg.sender, "Factoring:only client approves invoice");
        invoices[invoiceID].status = Status.Active;
    }

    function buyInvoice(uint256 invoiceID, uint256 fractions) public {
        InvoiceMeta memory metadata = invoices[invoiceID];
        uint256 cost = fractions * metadata.fractionalPrice;

        metadata.token.transferFrom(msg.sender, metadata.issuer, cost);
        invoice.transferFromAnyone(metadata.issuer, msg.sender, invoiceID, fractions, "");
    }

    function repayInvoice(uint256 invoiceID, uint256 amount) public {
        InvoiceMeta storage metadata = invoices[invoiceID];
        uint256 repaymentLimit = invoice.totalSupply(invoiceID) * metadata.fractionalPrice;

        require(metadata.status == Status.Active);
        require(repaymentLimit <= amount + metadata.repaymentAmount);

        metadata.token.transferFrom(msg.sender, address(this), amount);
        metadata.repaymentAmount += amount;

        if (repaymentLimit == metadata.repaymentAmount) {
            metadata.status = Status.Repaid;
        }
    }

    function withdrawRewards(uint256 invoiceID) public {
        InvoiceMeta storage metadata = invoices[invoiceID];
        require(metadata.status == Status.Repaid);
    }
}
