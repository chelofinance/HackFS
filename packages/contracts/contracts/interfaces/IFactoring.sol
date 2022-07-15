// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

struct InvoiceMeta {
    bool isActive;
}

interface IFactoring {
    function setInvoice(uint256 invoiceID) external;

    function approveInvoice(uint256 invoiceID) external;
}
