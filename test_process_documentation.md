# Test Process Documentation

## development environtement
You should have the 'standard stuff' installed: node (10.9), npm (6.4.0), truffle (4.1.14), ganache-cli (v6.1.8) with (ganache-core: 2.2.1), Chrome + MetaMask, ...

## start ganache-cli
I never encountered that problem, but it is suggested [reason](https://github.com/trufflesuite/truffle/issues/660#issuecomment-343066784) [source](https://truffleframework.com/boxes/truffle-next) to run ganache-cli (testrpc) with the following options:
1. `ganache-cli --gasLimit 6721975 --gasPrice 100000000000`
2. keep the displayed mnemonic to later initialize a new MetaMask wallet

## local compile and run tests
In another terminal, you can compile, migrate and test the contracts locally.
1. `cd VehicleHistoryLog`
2. `npm install`
3. `truffle compile`
4. `truffle migrate --reset`
5. `truffle test`
You should expect to see 10/10 test run successfully.

## Web UI
As mentioned in [README.md](../README.md) the Webinterface it unfortunately pretty unfinished, nevertheless all the smartcontract + React + next.js project integration has been done and it should be possible to start the webserver to get some basic information displayed in a webbrowser.
1. (Only) if the contract interface (of `ERC721Vehicle.sol`) had been changed and re-compiled, then watch out: The client needs a copy / symlink from `build/contracts` to `client/lib/contracts` as React can not access the .json files outside its (client) directory. Option Copy : `cp -rf ./build/contracts ./client/lib/` or (better on Linux) Option Symlink : `cd client/lib && ln -s ../../build/contracts/ contracts && cd ../..`. There is also a bash script for this : `link-contracts.sh`
2. `cd client` (if you are not within the client directory, you will get an error message `npm ERR! missing script: dev`)
3. `npm install`
4. `npm run dev`
5. Within MetaMask select the ganache-cli local blockchain network: [http://localhost:8545](http://localhost:8545)
6. Create a new wallet using the menmonic displayed by genache-cli at startup
(When developing it is actually a good idea to quite often restart ganache-cli and create a new MetaMask wallet as MetaMask notoriously caches stuff which may cause a lot of problems. [https://medium.com/coinmonks/what-we-learned-building-our-first-dapp-28b01f9fc244](https://medium.com/coinmonks/what-we-learned-building-our-first-dapp-28b01f9fc244))
7. Access with your browser [http://localhost:3000](http://localhost:3000)


The basic functionality should work:
- Display current MetaMask account[0]
- executing a transaction (mintNewVehicleToken) with confirmation via MetaMask
- reflect update to the contract state by executing "getVehicleData"
- reflect update to the contract state by executing "getLastSerial" (will show up after "last new tokenId")
- get Ether Balance


## Deploy to Rinkeby Testnet
There is already a contract deploayed on Rinkeby, but if you want to try it yourself, it should be pretty easy with the setup provide.
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







