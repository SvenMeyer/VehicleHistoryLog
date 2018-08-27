# VehicleHistoryLog

## Motivation
A vehicle's value is to a great extend determined by the miles driven and the service history. Historically paper-based log books have been used to keep a record, but fraudulent vehicle dealer like to manipulate them to pretend a lower milage and better service history in order to gain a higher price. In addition, blank vehicle service history log books are easily available to everybody on ebay which makes this fraud even easier to carry out.

To fix this process a blockchain based system shall be developed.
Blockchain based system have quite some outstanding features, with most of them being highly desireable for this application:

* multiple parties need to share a joint view on a dataset
* tamper proof data : no entry can be changed once it has been added
* tamper proof system behavior : once deployed, the code which is defining the behavior of the system, can not be changed
* each data entry and code deployment is time stamped
* decentralized : there is no single system which cab fail
* open : all code and data is openly accessible and thus verifiable
* consorship resistant : nobody can stop the system

## Actors / Users of the System
* Vehicle Manufacturer (roles: creator, seller)
* Vehicle Owner (roles: log entry provider, seller)
* Service Provider (roles: log entry provider, seller, (user) )
* (temporary user of the vehicle - optional - future extension)

## Use Cases

### 1 create new vehicle
Allowed users : Vehicle Manufacturer  
(The initial version may assume that there is only one Vehicle Manufacturer.)

1.1 Vehicle Manufacturer creates a new instance of a vehicle providing initial immutable data of the vehicle:
* vehicle id
* make
* model
* chassis number
* engine number

1.2 Vehicle Manufacturer becomes owner of the vehicle.

### 2 set service station
Allowed users : Owner  
2.1 designate (temporarely) a vehicle's service provider which will be allowed to conduct the service and to add log entries to the vehicle's service history.  
To revoke, service provider needs to be set to 0.

### 3 add log entry
Allowed users : Service Provider, Owner (for self-service tasks)  
3.1 add a log entry to the service history providing the followind data  
* odometer reading
* descrition of performed tasks
* URI to additional documents (PDF-file or image)

### 4 get (last) log entry for vehicle
Allowed users : any  
4.1 get last log entry for a vehicle (specified by its id)  
4.2 return log entry id (= number of current log entries)

### 5 get log entry for vehicle by id
Allowed users : any  
5.1 get a certain log entry for a vehicle

### 6 offer vehicle for sale
Allowed users : Owner  
6.1 offer vehicle for sale by providing
* status update (for sale = true)
* set requested price (in Wei)

### 7 buy vehicle
Allowed users : any  
7.1 user accept offer by sending at least the requested amount to current vehicle owner
7.2 return potential surplus amount to buyer (full amount if it was less than requested price)
7.3 transfer ownership of vehicle to buyer

### 8 burn vehicle
Allowed users : Owner  
8.1 remove vehicle from existence


# Implementation & Development Approach

For the outlined requirements, an implementation based on Non-Fungible-Token (NFT) as defined in [ERC721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) seems to be a perfect fit.

Every ERC-721 compliant contract must implement the ERC721 and ERC165 interfaces:
[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)  
[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md)

Given the limited time to implement this projects as well as the fact that the standard is pretty new, and to reuse as much implementation knowledge and effort which has been made available on this new topic so far, the [ERC721Token](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/ERC721/ERC721Token.sol) implementation from OpenZeppelin will be used as a basis for this project.

The ERC721Vehicle contract will inherit from the ERC721Token, which will give it the basic NFT functionaliy. ERC721Token inherits from ERC721BasicToken and implements the interfaces ERC721, ERC721Enumerable and ERC721Metadata. To get a better overview, a [UML class/contract diagram](./UML/UML%20ERC721%20Vehicle.svg) has been created which can be found in the UML folder.


## Development tools setup

For ease of development and testing within [Remix](https://remix.ethereum.org/) all contracts, including the contracts from the ERC721 library implementation of OpenZeppelin reside in the contracts folder. Running [remixd](https://github.com/ethereum/remixd) pointing to the local contracts folders (easily being done on Linux using the provided remixd.sh file), enables the possibility to link Remix to this local folder. This allows testing all functions of the contracts with the autogenerated UI, having the files securely  storedlocally, and accessible by other local editors and tools. Changes either in Remix or any tool working on the local files will be synced in both directions.


## Development Process

Initially only the contracts were developed using Remix with the described setup.

Following that, the contracts were integrated into a truffle project structure (generated by truffle init).

During following interations, a few integrations with various React project folder structures and boiler plates were conducted and evaluated, with finally using a truffle + React + next.js setup based on a [truffle-next box](https://truffleframework.com/boxes/truffle-next).

