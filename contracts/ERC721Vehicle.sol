pragma solidity ^0.4.24;

import "./ERC721.sol";
import "./ERC721Token.sol";
import "./SupportsInterfaceWithLookup.sol";


/**
 * @title ERC721Vehicle for VehicleHistory Log
 * This implementation implements a ERC721 Vehicle Token which shall be used
 * as a basis for a Vihicle Service History Log
 * https://github.com/SvenMeyer/VehicleHistoryLog/blob/master/README.md
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract ERC721Vehicle is ERC721Token {

	uint vehicleID;
	string make;
	string model;
	string chassisNumber;
	string engineNumber;

	struct IPFSMultihash {
		bytes32 digest;
		uint8 hashFunction;
		uint8 size;
	}

	struct LogEntry {
		uint id;
        uint milage;
		IPFSMultihash IPFSdocument;
        string description;
    }

	LogEntry[] HistoryLog;
	
	// Mapping from Vehicle (token id) to HistoryLog
	mapping(uint256 => uint256) internal allTokensIndex;


	/**
	 * @dev Constructor function
	 */
	// constructor() public {
		// should all be (automatically) be done in the super class ERC721Token
	// }

}