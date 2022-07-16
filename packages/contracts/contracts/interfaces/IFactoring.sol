// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

enum Status {
    Created,
    Active,
    Repaid
}

struct InvoiceMeta {
    Status status;
    uint256 fractionalPrice;
    uint256 repaymentAmount;
    address issuer;
    address receiver;
    IERC20 token;
}

interface IFactoring {
    function setInvoice(
        uint256 invoiceID,
        uint256 fractionalPrice,
        address issuer,
        address receiver,
        IERC20 token
    ) external;

    function approveInvoice(uint256 invoiceID) external;
}
