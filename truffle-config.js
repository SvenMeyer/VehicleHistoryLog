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

require('@babel/register')
require('@babel/polyfill')

var HDWalletProvider = require('truffle-hdwallet-provider')

var mnemonic = process.env.HDWALLET_MNEMONIC

// local default test wallet
// var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

module.exports = {
  networks: {
    ropsten: {
      provider: new HDWalletProvider(mnemonic, process.env.ROPSTEN_PROVIDER_URL),
      network_id: 3,
      gas: 4612388,
      gasPrice: 100000000000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, process.env.RINKEBY_PROVIDER_URL),
      network_id: 4,
      gas: 4612388,
      gasPrice: 100000000000
    },
    // port: 7545 - ganache GUI
    // port: 8545 - ganache CLI
    // port: 9545 - truffle develop (Truffle's built-in blockchain) 
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"  // Match any network id
    }
  }
}


