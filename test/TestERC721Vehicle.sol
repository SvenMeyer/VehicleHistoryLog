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
        // VehicleIdNumber memory v1 = VehicleIdNumber(1001, 2001);
        // VehicleIdNumber memory v2 = VehicleIdNumber({vin:1002, ein:2002});

        // uint ser1 = vc.mintNewVehicleToken(v1.vin, v1.ein);
        uint ser1 = vc.mintNewVehicleToken(1001, 2001);
        Assert.equal(ser1, 1, "serial of first vehicle should be 1");
        uint ser2 = vc.mintNewVehicleToken(1002, 2002);
        Assert.equal(ser2, 2, "serial of second vehicle should be 2");
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
