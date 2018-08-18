pragma solidity ^0.4.24;

import "./ERC721.sol";
import "./ERC721Token.sol";
import "./SupportsInterfaceWithLookup.sol";


/**
 * @title ERC721Vehicle for Vehicle History Log
 * This implementation implements a ERC721 Vehicle Token to be used
 * as a basis for a Vehicle Service History Log
 * https://github.com/SvenMeyer/VehicleHistoryLog/blob/master/README.md
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */

contract ERC721Vehicle is ERC721Token {

	// creator of this contract (=vehicle manufaturer) and the only one allowed to mint new vehicle token
	address creator;

	// vehicle token serial numbers will get numbered starting from 1 (we reserve 0 for not existing/allowed)
	uint internal serial = 0;
 
    string constant ERROR_TOKEN_DOES_NOT_EXIST = "ERROR: Token does not exist.";
    string constant ERROR_ENTRY_DOES_NOT_EXIST = "ERROR: This entry does not exist.";
    
    // Space saving struct for 17 character VIN - Vehicle Identification Number - ISO Standard 3779
	// and Engine Identification Number (will be used once web3.js with ABIEncoderV2 is fully tested)
	/*
		struct VehicleIdNumber {
		bytes[17] vin;
		bytes[15] ein;
	}
	*/
		struct VehicleIdNumber {
		uint vin;
		uint ein;
	}


    mapping (uint256 => VehicleIdNumber) internal VehicleIdNumbers;
    
	struct LogEntry {
        uint milage;
        string description;
		string documentURI;
    }

	// it is not possible to map to a (dynamic) array
	// the array needs to be wrapped in a struct
	// https://ethereum.stackexchange.com/questions/12097/creating-dynamic-arrays
	struct HistoryLog {
		LogEntry[] structArray;
	}

	// Mapping from Vehicle (token id) to HistoryLog
	mapping (uint => HistoryLog) historyLogs;



	/**
	 * @dev Constructor function
	 */
	constructor(string _name, string _symbol) ERC721Token(_name, _symbol) public {
		creator = msg.sender;
	}

        
    function isValidToken(uint _tokenId) public view returns (bool _valid) {
		return tokenOwner[_tokenId] != address(0);
    }
    
    // TODO: use pragma experimental ABIEncoderV2
    // https://ethereum.stackexchange.com/questions/39976/working-with-structs-in-solidity-and-web3js
    
    function appendLogEntry(uint _tokenID, uint _milage, string _description, string _documentURI) public returns (uint length) {
        require(isValidToken(_tokenID), ERROR_TOKEN_DOES_NOT_EXIST);
        // if there are already entries then the milage must be equal or greater than the previous entry
        if (historyLogs[_tokenID].structArray.length > 0)
            require(_milage >= historyLogs[_tokenID].structArray[historyLogs[_tokenID].structArray.length - 1].milage,
                "ERROR: Milage must be equal or greater than the previous entry.");
        return historyLogs[_tokenID].structArray.push(LogEntry(_milage, _description, _documentURI));
    }
    
    function getLogEntryCount(uint _tokenID) public view returns (uint length) {
        require(isValidToken(_tokenID), ERROR_TOKEN_DOES_NOT_EXIST);
        return historyLogs[_tokenID].structArray.length;
    }

    function getLogEntryAtIndex(uint _tokenID, uint _index) public view returns(uint _milage, string _description, string _documentURI) {
        require(isValidToken(_tokenID), ERROR_TOKEN_DOES_NOT_EXIST);
        require(_index < historyLogs[_tokenID].structArray.length, ERROR_ENTRY_DOES_NOT_EXIST);
        return (
            historyLogs[_tokenID].structArray[_index].milage, 
            historyLogs[_tokenID].structArray[_index].description,
            historyLogs[_tokenID].structArray[_index].documentURI);
    }
    
    function getLogEntryLast(uint _tokenID) public view returns(uint _milage, string _description, string _documentURI) {
        require(getLogEntryCount(_tokenID) > 0, "ERROR: tokenId has to be larger than 0");
        return getLogEntryAtIndex(_tokenID, getLogEntryCount(_tokenID) - 1 );
    }
    

	/**
	* @dev public function to mint a new token for a new car
	* @return uint serial number of new vehicle token
	*/
	function mintNewVehicleToken(uint _vin, uint _ein) public returns (uint) {
		// require(msg.sender == creator, "Access Right Error: Only creator is allowed to mint new vehicle token.");
		serial += 1;
		_mint(creator, serial);
		VehicleIdNumbers[serial] = VehicleIdNumber({vin:_vin, ein:_ein});
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