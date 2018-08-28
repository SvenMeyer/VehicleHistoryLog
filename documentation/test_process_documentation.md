# Test Process Documentation

## preparation
1. Setup .envrc file with environment variables
2. `source .envrc`
3. terminal 1 : `ganache-cli -m "$HDWALLET_MNEMONIC"`

## terminal 2 - local compile and run tests
1. `cd VehicleHistoryLog`
2. `truffle compile --all`
3. `truffle migrate --network development --reset`
4. `truffle test`

## Deploy to Rinkeby Testnet
1. make sure you have enough test ETH in the Rinkeby account with the corresponding wallet mnemonic defined in env variable `HDWALLET_MNEMONIC`
2. `truffle migrate --network rinkeby --reset`

```
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x19d6ad1073f348a60195ebc6756d27a5a213959415dc3c8512186c571cbe9d4e
  Migrations: 0x75c95a3a68f1bfbc9cd2f6dd6b6c12d98f9841b3
Saving successful migration to network...
  ... 0x6ea723e824c9ba3cd51d0fb06072b0f6b4a3d712efc64c363283bc7b5a543997
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying ERC721Vehicle...
  ... 0x77935675c609b9d1f85d9b708325fd0b5e29b9cddfd1701322721b6ff1c227f9
  ERC721Vehicle: 0x608b4012179129a20cb0916af0b03cbe2a8db320
Saving successful migration to network...
  ... 0xfea73d21e458e28641599548d76f4450a09929309f5aa0d100dfcb038a82c8a9
Saving artifacts...
```
ERC721Vehicle contract address : 0x608b4012179129a20cb0916af0b03cbe2a8db320
[https://rinkeby.etherscan.io/address/0x608b4012179129a20cb0916af0b03cbe2a8db320](https://rinkeby.etherscan.io/address/0x608b4012179129a20cb0916af0b03cbe2a8db320)


## Access the contract on Rinkeby network using Remix as UI

1. start remixd to make the project contract folder available for Remix `./remixd.sh`
2. open browser with Metamask, choose Rinkeby network, login wallet
3. start [Remix](https://remix.ethereum.org) in your 
4. link Remix to the local folder provided by remixd clicking on the link icon (top left corner)
5. Select `localhost/contracts/ERC721Vehicle.sol` and compile
6. Select the [Run]-tab, make sure yiur are on Rinkeby and have funding in your account[0]
7. Select `ERC721Vehicle` in the drop down, paste the contract address into input field, press [At Address] button
8. open the UI in the 'Deployed Contracts' section

## Interacting with the ERC721Vehicle smart contract

### mintNewVehicleToken - create a new token for a new vehicle (only deployer of contract)

1. check the [name], [symbol], [totalSupply] , [creator] , [getLast Serial] using the respective buttons
2. create a new ERC721 token for a new car using [mintNewVehicleToken] ... possible test data : 'Cayenne' , 'WP1AA2A24CLA09461' , 'AFD' (but use someting different as other developers may use the same contract and you have the chance to create your own Porsche token !)
3. click [transact] and remember to confirm the transaction by clicking on the MetaMask icon

### retrieve overall data and data about token

1. [getLastSerial] returns the currently highest tokenId = number of generated token
1. try [isValidToken], [getVehiclaData], [getVehiclaData_Struct] , ...


### appendLogEntry - add service history log entries to vehicle

1. use [appendLogEntry] to provide some parameter for a new service history log entry and add it to your token
2. create a 2nd entry

### retrieve service history log entry

1. check [getLogEntryCount]
1. use [getLogLastEntry] get retrieve the last service history log entry
2. use getLogAtIndex to retrieve a certain log entry (counting starts from 0) for a certain vehicle (tokenId counting starts from 1)

## Explore the token within MetaMask wallet and etherscan

4. Goto MetaMask again, choose menu, then [add token], tab 'custom token'
5. paste the contract address into the 'Token Address' field, click [next], click [add tokens]
6. Now you should see you own NFT (Non fungible Token) Porsche token in your MetaMask wallet !
7. Check the contract on [rinkeby.etherscan.io](https://rinkeby.etherscan.io/address/0x608b4012179129a20cb0916af0b03cbe2a8db320), you should see the transaction
8. Click on 'Token Tracker:' [Porsche (POR)](https://rinkeby.etherscan.io/token/0x608b4012179129a20cb0916af0b03cbe2a8db320) to explore the Transfers and Holders of Porsche token.








