// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ERC1155Supply } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { ERC1155URIStorage } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import { ERC1155Receiver } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

import { IInvoice } from "./interfaces/IInvoice.sol";

contract Invoice is IInvoice, ERC1155Receiver, ERC1155, AccessControl, ERC1155Supply, ERC1155URIStorage {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant FACTORING_ROLE = keccak256("FACTORING_ROLE");

    constructor(string memory _baseURI) ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setBaseURI(_baseURI);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        string memory uri = abi.decode(data, (string));

        _setURI(id, uri);
        _mint(account, id, amount, data);
    }

    function burnFor(
        address from,
        uint256 id,
        uint256 amount
    ) external onlyRole(FACTORING_ROLE) {
        _burn(from, id, amount);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function uri(uint256 tokenID) public view virtual override(ERC1155URIStorage, ERC1155) returns (string memory) {
        return ERC1155URIStorage.uri(tokenID);
    }

    function transferFromAnyone(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyRole(FACTORING_ROLE) {
        _safeTransferFrom(from, to, id, amount, data);
    }

    // The following functions are overrides required by Solidity.
    function exists(uint256 id) public view override(ERC1155Supply, IInvoice) returns (bool) {
        return ERC1155Supply.exists(id);
    }

    function totalSupply(uint256 id) public view override(ERC1155Supply, IInvoice) returns (uint256) {
        return ERC1155Supply.totalSupply(id);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(IERC165, ERC1155, AccessControl, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }
}
