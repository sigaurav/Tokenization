const Token = artifacts.require("PTToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("All tokens should be in deployer's account", async() => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async() => {
        const sendToken = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;

        
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    }); 

    it("Should not be able to send more token than available with owner", async() => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        await expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });

});