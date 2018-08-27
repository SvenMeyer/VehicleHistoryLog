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

