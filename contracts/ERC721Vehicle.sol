pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

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
	address public creator;

	// vehicle token serial numbers will get numbered starting from 1 (we reserve 0 for not existing/allowed)
	uint internal serial = 0;
 
    string constant ERROR_ENTRY_DOES_NOT_EXIST = "ERROR: This entry does not exist.";

	/* TYPE DEFINITIONS **************************************** */
    
    // Space saving struct for 17 character VIN - Vehicle Identification Number - ISO Standard 3779
	// and Engine Identification Number (optimization will be done once initial version is working)
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
		address auditor;
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

	/* EVENTS   **************************************** */
	event NewVehicleToken(uint indexed tokenId);
	event NewLogEntry(uint indexed tokenId);
    event ForSale(uint indexed tokenId);
    event Sold(uint indexed tokenId);
//  event Shipped(uint indexed tokenId);
    event Received(uint indexed tokenId);
	event VehicleBurnt(uint indexed tokenId);

	/* FUNCTIONS **************************************** */

	/**
	 * @dev Constructor function
	 */
	// constructor(string _name, string _symbol) ERC721Token(_name, _symbol) public {
	// call constructor of super class/contract with parameter
	// TODO: accept parameter from deployer	
	constructor () ERC721Token("Porsche","POR") public {
		creator = msg.sender;
	}
       
    function isValidToken(uint _tokenId) public view returns (bool _valid) {
		return (_tokenId > 0) && (tokenOwner[_tokenId] != address(0));
    }

	modifier onlyValidToken(uint _tokenId) {
		require(isValidToken(_tokenId), "ERROR: Token does not exist.");
		_;
	}
    
    // TODO: use pragma experimental ABIEncoderV2
    // https://ethereum.stackexchange.com/questions/39976/working-with-structs-in-solidity-and-web3js
    
    function appendLogEntry(uint _tokenId, uint _milage, string _description, string _documentURI) public 
		onlyValidToken(_tokenId)
		returns (uint length)
	{
        // require(isValidToken(_tokenId), ERROR_TOKEN_DOES_NOT_EXIST);
		require(msg.sender == ownerOf(_tokenId) ||
				msg.sender == creator ||
				msg.sender == getApproved(_tokenId));
        // if there are already entries then the milage must be equal or greater than the previous entry
        if (historyLogs[_tokenId].structArray.length > 0)
            require(_milage >= historyLogs[_tokenId].structArray[historyLogs[_tokenId].structArray.length - 1].milage,
                "ERROR: Milage must be equal or greater than the previous entry.");
		emit NewLogEntry(_tokenId);
        return historyLogs[_tokenId].structArray.push(LogEntry({auditor: msg.sender, milage:_milage, description: _description, documentURI: _documentURI}));
    }
    
    function getLogEntryCount(uint _tokenId) public view
		onlyValidToken(_tokenId)
		returns (uint length)
	{
        // require(isValidToken(_tokenId), ERROR_TOKEN_DOES_NOT_EXIST);
        return historyLogs[_tokenId].structArray.length;
    }

    function getLogEntryAtIndex(uint _tokenId, uint _index) public view 
		onlyValidToken(_tokenId)
		returns(address _auditor, uint _milage, string _description, string _documentURI)
	{
        // require(isValidToken(_tokenId), ERROR_TOKEN_DOES_NOT_EXIST);
        require(_index < historyLogs[_tokenId].structArray.length, ERROR_ENTRY_DOES_NOT_EXIST);
        return (
			historyLogs[_tokenId].structArray[_index].auditor,
            historyLogs[_tokenId].structArray[_index].milage, 
            historyLogs[_tokenId].structArray[_index].description,
            historyLogs[_tokenId].structArray[_index].documentURI);
    }
    
    function getLogEntryLast(uint _tokenId) public view
		onlyValidToken(_tokenId)
		returns(address _auditor, uint _milage, string _description, string _documentURI)
	{
        // require(getLogEntryCount(_tokenId) > 0, "ERROR: tokenId has to be larger than 0");
        return getLogEntryAtIndex(_tokenId, getLogEntryCount(_tokenId) - 1 );
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
		emit NewVehicleToken(serial);
		return serial;
	}

	/**
	* @dev get serial number of last produced vehicle = minted token
	* @return uint serial number of new vehicle token
	*/
	function getLastSerial() public view returns (uint) {
		return serial;
	}

	/* EXPERIMENTAL ********** */

	function getLogStructAtIndex(uint _tokenId, uint _index) public view 
		onlyValidToken(_tokenId)
		returns(LogEntry)
	{
        // require(isValidToken(_tokenId), ERROR_TOKEN_DOES_NOT_EXIST);
        require(_index < historyLogs[_tokenId].structArray.length, ERROR_ENTRY_DOES_NOT_EXIST);
        return (historyLogs[_tokenId].structArray[_index]);
    }
    
    function getLogStructLast(uint _tokenId) public view
		onlyValidToken(_tokenId)
		returns(LogEntry)
	{
        // require(getLogEntryCount(_tokenId) > 0, "ERROR: tokenId has to be larger than 0");
        return getLogStructAtIndex(_tokenId, getLogEntryCount(_tokenId) - 1 );
    }
}