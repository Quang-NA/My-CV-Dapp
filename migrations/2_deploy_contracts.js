var MyExampleContract = artifacts.require("./MyExampleContract.sol");

module.exports = function(deployer) {
  deployer.deploy(MyExampleContract);
};
