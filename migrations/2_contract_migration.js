var ERC721Vehicle = artifacts.require("./ERC721Vehicle.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721Vehicle, "Porsche", "POR");
};
