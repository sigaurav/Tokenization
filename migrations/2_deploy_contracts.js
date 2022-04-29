var PTToken = artifacts.require("./PTToken.sol");
var PTTokenSale = artifacts.require("./PTTokenSale");

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(PTToken,1000000);
  await deployer.deploy(PTTokenSale, 1, addr[0], PTToken.address);
  let instance = await PTToken.deployed();
  await instance.transfer(PTTokenSale.address, 1000000);
};