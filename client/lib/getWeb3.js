import Web3 from 'web3'

const resolveWeb3 = (resolve) => {
  let { web3 } = window
  const alreadyInjected = typeof web3 !== 'undefined' // i.e. Mist/Metamask
  // port: 7545 - ganache GUI
  // port: 8545 - ganache CLI
  // port: 9545 - truffle develop (Truffle's built-in blockchain)
  const localProvider = `http://localhost:8545`

  if (alreadyInjected) {
    console.log(`Injected web3 detected.`)
    // if we already have an injected web3 version (by MetaMask), just grab the provider
    // and use the local web3@1.0.0 with that provider
    web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log(`No web3 instance injected, using Local web3.`)
    const provider = new Web3.providers.HttpProvider(localProvider)
    web3 = new Web3(provider)
  }
  console.log('getWeb3.js - using web3 version:', web3.version)
  console.log('web3.currentProvider:', web3.currentProvider)
  resolve(web3)
}

export default () =>
  new Promise((resolve) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve)
    })
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve)
    }
  })