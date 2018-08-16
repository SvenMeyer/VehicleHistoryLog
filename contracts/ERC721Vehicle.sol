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

	// creator of this contract (=vehicle manufaturer) and the only one allowed to mint new vehicle token
	address creator;

	// vehicle token serial numbers will get numbered starting from 1 (we reserve 0 for not existing/allowed)
	uint internal serial = 0;

	// uint vehicleID; -> tokenId
	// string make;    -> 
	// string model;
	string chassisNumber;
	string engineNumber;

	// https://github.com/saurfang/ipfs-multihash-on-solidity
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
	constructor(string _name, string _symbol) ERC721Token(_name, _symbol) public {
		creator = msg.sender;
	}

	/**
	* @dev public function to mint a new token for a new car
	* @return uint serial number of new vehicle token
	*/
	function mintNext() public returns (uint) {
		require(msg.sender == creator, "Access Right Error: Only creator is allowed to mint new vehicle token.");
		serial += 1;
		_mint(creator, serial);
		return serial;
	}

	/**
	* @dev get serial number of last produced vehicle = minted token
	* @return uint serial number of new vehicle token
	*/
	function getLastSerial() public view returns (uint) {
		return serial;
	}
}