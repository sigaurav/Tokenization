const PTTokenSale = artifacts.require("PTTokenSale");
const Token = artifacts.require("PTToken");
const Kyc = artifacts.require("KYCSale");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path:"../.env"});

contract("TokenSale Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("Should not have any tokens left in deployer account", async() => {
        let instance = await Token.deployed();
        return await expect(instance.balanceOf.call(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("All tokens should be in the PTTokensale constract by default", async() => {
        let instance = await Token.deployed();
        let balanceOfSaleContract = await instance.balanceOf.call(PTTokenSale.address);
        let totalSupply = await instance.totalSupply.call();
        return await expect(balanceOfSaleContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("Should be able to buy tokens by simply sending ether to contract", async() => {
        let instance = await Token.deployed();
        let saleInstance = await PTTokenSale.deployed();
        let balanceBeforeTransaction = await instance.balanceOf.call(recipient);
        let kycInstance = await Kyc.deployed();
        await kycInstance.setKycCompleted(recipient);
        await expect(saleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeTransaction + 1).to.be.bignumber.equal(await instance.balanceOf.call(recipient));
    });

});