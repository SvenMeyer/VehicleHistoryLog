# Test Process Documentation

## development environtement
You should have the 'standard stuff' installed: node (10.9), npm (6.4.0), truffle (4.1.14), ganache-cli (v6.1.8) with (ganache-core: 2.2.1), Chrome + MetaMask, ...

## start truffle / ganache-cli
I had quite some problems with ganache-cli ... as well as developers from the actual truffle team, who suggested to stay with truffle !
So, make sure to use [http://127.0.0.1:9545](http://127.0.0.1:9545 )

If somebody wants to try ganache.cli anyway ...
It is suggested [reason](https://github.com/trufflesuite/truffle/issues/660#issuecomment-343066784) [source](https://truffleframework.com/boxes/truffle-next) to run ganache-cli (testrpc) with the following options:
1. `ganache-cli --gasLimit 6721975 --gasPrice 100000000000`
2. keep the displayed mnemonic to later initialize a new MetaMask wallet

## local compile and run tests
In another terminal, you can compile, migrate and test the contracts locally.
1. `cd VehicleHistoryLog`
2. `truffle compile --all` *** 
DO NOT DO: `truffle develop` and then `> compile` within truffle. It looks like (after just 1 week of research !!) that this produces corrupt contract.json files with missing functions definition! In this case the JavaScript frontend will not be able to access the function signtures and the call to the contract will fail for that function! ***
3. `truffle migrate --reset --all` (deploy on truffle blockchain - port 9545)
4. `truffle develop`
5. `> test` You should expect to see 10/10 test run successfully.

## deploy on ganache-cli
I had some problems with ganache-cli (maybe because of using web3@1.0.0-beta, but the last time I checked it worked well. To deploy on ganache-cli (port 8545) do:
1. (new terminal window) `ganache-cli`
2. (terminal with truffle) `> migrate --reset --all --network local8545`

## Web UI
As mentioned in [README.md](../README.md) the Webinterface it unfortunately pretty unfinished, nevertheless all the smartcontract + React + next.js project integration has been done and it should be possible to start the webserver to get some basic information displayed in a webbrowser.
1. (Only) if the contract interface (of `ERC721Vehicle.sol`) had been changed and re-compiled, then watch out: The client needs a copy / symlink from `build/contractsclient/lib/contracts` as React can not access the .json files outside its (client) directory. Option Copy : `cp -rf ./build/contracts ./client/lib/` or (better on Linux) Option Symlink : `cd client/lib && ln -s ../../build/contracts/ contracts && cd ../..`. There is also a bash script for this : `link-contracts.sh`
2. `cd client` (if you are not within the client directory, you will get an error message `npm ERR! missing script: dev`)
3. `npm install`
4. `npm run dev`
5. Within MetaMask select either the ganache-cli local blockchain network: [http://localhost:8545](http://localhost:8545) or truffle develop blockchain network [http://localhost:9545](http://localhost:9545)
6. Create a new wallet using the menmonic displayed at startup (either ganache-cli or truffle develop)
(When developing it is actually a good idea to quite often restart ganache-cli and create a new MetaMask wallet as MetaMask notoriously caches stuff which may cause a lot of problems. [https://medium.com/coinmonks/what-we-learned-building-our-first-dapp-28b01f9fc244](https://medium.com/coinmonks/what-we-learned-building-our-first-dapp-28b01f9fc244))
7. Access with your browser [http://localhost:3000](http://localhost:3000)


The basic functionality should work:
- Display current MetaMask account[0]
- executing a transaction (mintNewVehicleToken) with confirmation via MetaMask
- reflect update to the contract state by executing "getLastVehicleData"
- reflect update to the contract state by executing "getLastSerial" (will show up after "last new tokenId")
- get Ether Balance
- create a new ERC721Vehicle token
- list and retrieve data of all ERC721Vehicle token

## Use Deployed contract of Rinkeby Testnet
There is a contract already deployed on the Rinkeby network, which you can also use:
1. Logout of MetaMask
2. Select Rinkeby Network
3. As most functions (currently) only work with the account of the deployer, you have to create the wallet from the mnemonic defined in env variable `HDWALLET_MNEMONIC` in file `.envrc` : "tomorrow draft giggle design purchase daring goddess cute inquiry giant thumb journey" (please do not drain all funds")
4. Best thing if you are on linux is just to do `source .envrc`
5. Access with your browser [http://localhost:3000](http://localhost:3000) , the UI will automatically use the contract on the Rinkeby network.
6. The "Simple UI" page [http://localhost:3000/dapp](http://localhost:3000/dapp) will also create links to etherscan to check accounts, smart contract and transactions if you used the Rinkeby network.

Unfortunately some of the software cache content, so if something does not work, then try:
1. Reset Wallet within MetaMask
2. restart `ganache-cli` and redeploy contracts
3. Restart webserver `Ctrl-C` `npm run dev`

## Deploy to Rinkeby Testnet
You can also easily deploy the contract on the Rinkeby net yourself:
1. make sure you have enough test ETH in the Rinkeby account
2. `truffle migrate --reset --all --network rinkeby`

## Access the contract on Rinkeby network using Remix as UI

1. start remixd to make the project contract folder available for Remix `./remixd.sh`
2. open browser with Metamask, choose Rinkeby network, login wallet
3. start [Remix](https://remix.ethereum.org) in your 
4. link Remix to the local folder provided by remixd clicking on the link icon (top left corner)
5. Select `localhost/contracts/ERC721Vehicle.sol` and compile
6. Select the [Run]-tab, make sure yiur are on Rinkeby and have funding in your account[0]
7. Select `ERC721Vehicle` in the drop down, paste the contract address (see file `deployed_addresses.txt`) into input field, press [At Address] button
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
7. Check the contract on [rinkeby.etherscan.io](https://rinkeby.etherscan.io), you should see the transactions.
8. Click on 'Token Tracker:' [Porsche (POR)] to explore the Transfers and Holders of Porsche token.

## Transfering ERC721 token to another account
Of course one important feature would be to be able to send the token to somebody else, but (again) MetaMask causes problems here as other developer report as well, that it simply does not work [https://github.com/MetaMask/metamask-extension/issues/5145](https://github.com/MetaMask/metamask-extension/issues/5145).







