// truffle.js

/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!

// etherplate/truffle.js
// Allows us to use ES6 in our migrations and tests.
// require('@babel/register')
// require('@babel/polyfill')

var HDWalletProvider = require('truffle-hdwallet-provider')

var mnemonic = process.env.HDWALLET_MNEMONIC

var privateKey = process.env.PRIVATEKEYADDRESS; // private keys

// local default test wallet
// var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

// enable for workaround to store build/contract.json within React directory
// const fullPathBuildDirectory = `${__dirname}/client/lib/contracts`;

module.exports = {

  // enable for workaround to store build/contract.json within React directory
  // contracts_build_directory: fullPathBuildDirectory,

  networks: {
    // port: 7545 - ganache GUI
    // port: 8545 - ganache CLI
    // port: 9545 - truffle develop (Truffle's built-in blockchain)
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    /*
    ropsten: {
      provider: new HDWalletProvider(mnemonic, process.env.ROPSTEN_PROVIDER_URL),
      network_id: 3,
      gas: 4612388,
      gasPrice: 100000000000
    },
    */
    ropsten: {
      provider: () => {
        return new HDWalletProvider(mnemonic, process.env.ROPSTEN_PROVIDER_URL)
      },
      network_id: 3,
      gas: 6500000,
      gasPrice: 100000000000
    },
    /*
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, process.env.RINKEBY_PROVIDER_URL),
      network_id: 4,
      from: '0xa31F3d5d0d8A412084a3f83D253340524F7f8897',
      gas: 6500000,
      gasPrice: 100000000000
    },
    */
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(mnemonic, process.env.RINKEBY_PROVIDER_URL)
      },
      network_id: 4,
      gas: 6500000,
      gasPrice: 100000000000
    }
  },

  solc: {
    // Turns on the Solidity optimizer. For development the optimizer's
    // quite helpful, just remember to be careful, and potentially turn it
    // off, for live deployment and/or audit time. For more information,
    // see the Truffle 4.0.0 release notes.
    //
    // https://github.com/trufflesuite/truffle/releases/tag/v4.0.0
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
