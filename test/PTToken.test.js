const Token = artifacts.require("PTToken");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path:"../.env"});

contract("Token Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    });

    it("All tokens should be in deployer's account", async() => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send tokens between accounts", async() => {
        const sendToken = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;

        
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    }); 

    it("Should not be able to send more token than available with owner", async() => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        await expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });

});