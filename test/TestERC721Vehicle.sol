pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ERC721Vehicle.sol";

contract TestERC721Vehicle {
    //define a contract-wide variable containing the smart contract to be tested, 
    //calling the DeployedAddresses smart contract to get its address.
    // ERC721Vehicle vc = ERC721Vehicle(DeployedAddresses.ERC721Vehicle());

    ERC721Vehicle vc;

    // uint public initialBalance = 10 ether;

    // function () public payable {}

    // we need this 'beforeEach()' function to make this test work
    // with owner of this test-contract = deployer of contract
    // https://michalzalecki.com/ethereum-test-driven-introduction-to-solidity
    // https://github.com/MichalZalecki/tdd-solidity-intro/blob/master/test/FundingTest.sol

    function beforeEach() public {
        vc = new ERC721Vehicle();
    }

    function testSettingAnOwnerDuringCreation() public {
        Assert.equal(vc.creator(), this, "An creator is different than a deployer");
    }

    function testSettingAnOwnerOfDeployedContract() public {
        vc = ERC721Vehicle(DeployedAddresses.ERC721Vehicle());
        Assert.equal(vc.creator(), msg.sender, "An creator is different than a deployer");
    }
    
	// Test to mint 2 new token = 2 new vehicles
    string constant model_1 = 'Cayenne';
    string constant vin_1   = 'WP1AA2A24CLA09461';
    string constant ein_1   = 'AFD';
    string constant model_2 = 'Cayenne Turbo';
    string constant vin_2   = 'WP1AA2A26ELA09612';
    string constant ein_2   = 'BFD';

    function testMintNewVehicleToken() public {
        uint tokenId_1 = vc.mintNewVehicleToken(model_1, vin_1, ein_1);
        Assert.equal(tokenId_1, 1, "tokenId of first vehicle should be 1");
        uint tokenId_2 = vc.mintNewVehicleToken(model_2, vin_2, ein_2);
        Assert.equal(tokenId_2, 2, "tokenId of second vehicle should be 2");
    // }

    // tokenId = serial is autoincremented
    // Test if the value can be retrieved and if the value is 2

    // function testGetLastSerial() public {
        Assert.equal(vc.getLastSerial(), 2, "last serial should be 2");
    // }

    // With 2 token/vehicles being added by now, tokenId 0 should be not valid
    // tokenId 1 and 2 should represent the 2 token/vehicles created before
    // there should not be a volid tokenId/vehicle 3

    // function testIsValidToken() public {
        Assert.equal(vc.isValidToken(0), false, "isValidToken(0) should be false");
        Assert.equal(vc.isValidToken(1), true , "isValidToken(1) should be true");
        Assert.equal(vc.isValidToken(2), true , "isValidToken(2) should be true");
        Assert.equal(vc.isValidToken(3), false, "isValidToken(3) should be false");
    // }
    }
}
