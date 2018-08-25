pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ERC721Vehicle.sol";

contract TestERC721Vehicle {
    //define a contract-wide variable containing the smart contract to be tested, 
    //calling the DeployedAddresses smart contract to get its address.
    ERC721Vehicle vc = ERC721Vehicle(DeployedAddresses.ERC721Vehicle());
    
	// Test to add first item

    function testMintNewVehicleToken() public {
        bytes32 model_1 = 'Cayenne';
		bytes32 vin_1   = 'WP1AA2A24CLA09461';
		bytes32 ein_1   = 'AFD';
        uint tokenId_1 = vc.mintNewVehicleToken(model_1, vin_1, ein_1);
        Assert.equal(tokenId_1, 1, "tokenId of first vehicle should be 1");

        bytes32 model_2 = 'Cayenne Turbo';
		bytes32 vin_2   = 'WP1AA2A26ELA09612';
		bytes32 ein_2   = 'BFD';
        uint tokenId_2 = vc.mintNewVehicleToken(model_2, vin_2, ein_2);
        Assert.equal(tokenId_2, 2, "tokenId of second vehicle should be 2");
    }

    function testGetLastSerial() public {
        Assert.equal(vc.getLastSerial(), 2, "last serial should be 2");
    }

    function testIsValidToken() public {
        Assert.equal(vc.isValidToken(0), false, "isValidToken(0) should be false");
        Assert.equal(vc.isValidToken(1), true , "isValidToken(1) should be true");
        Assert.equal(vc.isValidToken(2), true , "isValidToken(2) should be true");
        Assert.equal(vc.isValidToken(3), false, "isValidToken(3) should be false");
    }

}
