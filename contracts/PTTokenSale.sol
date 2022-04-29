// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Crowdsale.sol";

contract PTTokenSale is Crowdsale {
    constructor(
        uint256 rate,
        address payable wallet,
        ERC20 token
    ) Crowdsale(rate, wallet, token) {}
}
