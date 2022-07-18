// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { ERC20 as OpenERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is OpenERC20 {
    constructor() OpenERC20("MockToken", "MT") {}

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address receiver, uint256 amount) external {
        _mint(receiver, amount);
    }
}
