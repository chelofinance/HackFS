// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

import { IFactoring, InvoiceMeta, Status } from "./interfaces/IFactoring.sol";
import { IInvoice } from "./interfaces/IInvoice.sol";

contract Factoring is IFactoring, AccessControl {
    bytes32 public constant INVOICE_FACTORY = keccak256("INVOICE_FACTORY");

    uint256 public discountRate;
    IInvoice public invoice;
    mapping(uint256 => InvoiceMeta) public invoices;

    constructor(IInvoice _invoice) {
        invoice = _invoice;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setDiscountRate(uint256 newDiscount) public {
        //InvoiceMeta memory metadata = invoices[invoiceID];
        //require(metadata.issuer == msg.sender, "Factoring:only issuer approves invoice");
        //require(1 < newDiscount < -1, "Factoring:Invalid discount rate type");
        //discountRate = newDiscount;
    }

    function calculateFraction(uint256 principalAmount, uint256 periods) public view returns (uint256) {
        require(periods > 0, "Factoring:minimun number of periods is 1.");
        uint256 discountedPrincipal = principalAmount * (1 - discountRate);
        uint256 fractionPrice = discountedPrincipal / periods;
        require(discountedPrincipal == (fractionPrice * periods));
        return fractionPrice;
    }

    function setInvoice(
        uint256 invoiceID,
        uint256 repaymentAmount,
        uint256 fractionalPrice,
        address issuer,
        address receiver,
        IERC20 token
    ) public onlyRole(INVOICE_FACTORY) {
        invoices[invoiceID] = InvoiceMeta(Status.Created, repaymentAmount, fractionalPrice, 0, issuer, receiver, token);
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
        emit BuyInvoice(invoiceID, fractions, msg.sender);
    }

    function repayInvoice(uint256 invoiceID, uint256 amount) public {
        InvoiceMeta memory metadata = invoices[invoiceID];
        uint256 repaymentLimit = metadata.repaymentAmount;

        require(metadata.status == Status.Active, "Factoring: invoice status is not active");
        require(repaymentLimit >= amount + metadata.amountRepaid, "Factoring: repayment limit passed");

        metadata.token.transferFrom(msg.sender, address(this), amount);
        invoices[invoiceID].amountRepaid += amount;

        if (repaymentLimit == invoices[invoiceID].amountRepaid) {
            invoices[invoiceID].status = Status.Repaid;
        }

        emit RepayInvoice(invoiceID, amount, msg.sender);
    }

    function withdraw(uint256 invoiceID) public {
        InvoiceMeta memory metadata = invoices[invoiceID];
        require(metadata.status == Status.Repaid, "Factoring: invoice status is not repaid");

        uint256 balance = invoice.balanceOf(msg.sender, invoiceID);
        uint256 tokenAmount = (metadata.repaymentAmount / invoice.totalSupply(invoiceID)) * balance;

        invoice.burnFor(msg.sender, invoiceID, balance);
        metadata.token.transfer(msg.sender, tokenAmount);

        emit RewardsWithdrawed(invoiceID, msg.sender, balance, tokenAmount);
    }
}
