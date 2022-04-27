const Token = artifacts.require("PTToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised =require("chai-as-promised");
const { contracts_build_directory } = require("../truffle-config");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async(accounts) => {

    const[deployerAccount, recipient, anotherAccount] = accounts;

    it("All tokens should be in deployer's account", async() => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), totalSupply.valueOf(), "The Balance Was not same");

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async() => {
        const sendToken = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    }); 

    /* it("Should not be able to send more token than available with owner", async() => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        console.log(balanceOfDeployer+ " : " + await instance.balanceOf(deployerAccount));
        // expect(instance.transfer(recipient, new BN(balanceOfDeployer+3))).to.eventually.be.rejected;

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    }); */

});

contract ("Token Test 2", async(accounts) => {
    it("Should not be able to send more token than available with owner", async() => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        console.log(balanceOfDeployer+ " : " + await instance.balanceOf(deployerAccount));
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+3))).to.eventually.be.rejected;

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});