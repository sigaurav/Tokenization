var PTToken = artifacts.require("./PTToken.sol");
var PTTokenSale = artifacts.require("./PTTokenSale");
require("dotenv").config({path:"../.env"});


module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(PTToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(PTTokenSale, 1, addr[0], PTToken.address);
  let instance = await PTToken.deployed();
  await instance.transfer(PTTokenSale.address, process.env.INITIAL_TOKENS);
};