// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYCSale is Ownable{
    mapping(address => bool) allowed;

    function setKycCompleted(address _addr) public onlyOwner{
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    function isKycCompleted(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}
