// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { ERC1155 as OpenERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MockERC1155 is OpenERC1155 {
    uint256 currentId = 0;

    constructor() OpenERC1155("https://game.example/api/item/{id}.json") {}

    function mint(address target, uint256 amount) public {
        currentId++;
        _mint(target, currentId, amount, "");
    }
}
