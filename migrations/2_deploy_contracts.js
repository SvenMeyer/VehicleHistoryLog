var SimpleStorage = artifacts.require("./SimpleStorage.sol"); // eslint-disable-line no-undef
var ERC721Vehicle = artifacts.require("./ERC721Vehicle.sol"); // eslint-disable-line no-undef

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ERC721Vehicle);
};
