// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IInvoice is IERC1155 {
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    function totalSupply(uint256 id) external returns (uint256);

    function exists(uint256 id) external returns (bool);

    function transferFromAnyone(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function burnFor(
        address from,
        uint256 id,
        uint256 amount
    ) external;
}
