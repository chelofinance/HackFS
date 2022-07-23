// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "hardhat/console.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { IInvoiceFactory } from "./interfaces/IInvoiceFactory.sol";
import { IInvoice } from "./interfaces/IInvoice.sol";
import { IFactoring } from "./interfaces/IFactoring.sol";

contract InvoiceFactory is IInvoiceFactory {
    IInvoice public invoice;
    IFactoring public factoring;

    uint256 public idCount;

    constructor(IFactoring _factoring, IInvoice _invoice) {
        factoring = _factoring;
        invoice = _invoice;
    }

    function createInvoice(
        address client,
        uint256 fractions,
        uint256 fractionalPrice,
        uint256 repaymentAmount,
        string memory invoiceURI,
        IERC20 token
    ) external {
        uint256 tokenID = idCount++;

        invoice.mint(msg.sender, tokenID, fractions, abi.encode(invoiceURI));
        //uint256 fractionalPrice = factoring.calculateFraction(msg.value, fractions);
        factoring.setInvoice(tokenID, repaymentAmount, fractionalPrice, msg.sender, client, token);
        emit InvoiceCreated(tokenID);
    }
}
