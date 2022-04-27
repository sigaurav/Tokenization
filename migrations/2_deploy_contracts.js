var PTToken = artifacts.require("./PTToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PTToken, 1000000000);
};