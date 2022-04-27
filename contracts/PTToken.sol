// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PTToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Premium Watches Token", "PWT") {
        _mint(msg.sender, initialSupply);
    }
}