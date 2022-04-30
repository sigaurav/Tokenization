// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Crowdsale.sol";
import "./KYCSale.sol";

contract PTTokenSale is Crowdsale {

    KYCSale kyc;

    constructor(
        uint256 rate,
        address payable wallet,
        ERC20 token,
        KYCSale _kyc
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.isKycCompleted(msg.sender), "Pending KYC, Purchase not allowed");
    }
}
