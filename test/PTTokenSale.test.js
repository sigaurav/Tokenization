const PTTokenSale = artifacts.require("PTTokenSale");
const Token = artifacts.require("PTToken");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path:"../.env"});

contract("TokenSale Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("Should not have any tokens left in deployer account", async() => {
        let instance = await Token.deployed();
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

});