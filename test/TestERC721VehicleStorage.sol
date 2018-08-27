pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ERC721Vehicle.sol";

contract TestERC721VehicleStorage {

  // just tests basic functionality of contract to store and retrieve a value using solidity

  function testItStoresAValue() public {
    ERC721Vehicle vehicleStorage = ERC721Vehicle(DeployedAddresses.ERC721Vehicle());

    vehicleStorage.set(89);

    uint expected = 89;

    Assert.equal(vehicleStorage.get(), expected, "It should store the value 89.");
  }

}
