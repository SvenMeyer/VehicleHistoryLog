import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'

class Dapp extends React.Component {
  state = {
    balance: undefined,
    ethBalance: undefined,
    lastTokenId: undefined
  };

  newVehicleToken = async () => {
    const { accounts, contract } = this.props
    const model = 'Porsche Cayenne'
    const vin = 'WP1AB29P64LA63732'
    const ein = 'AFD'
    tokenId = await contract.methods.mintNewVehicleToken(web3.fromUtf8(model), web3.fromUtf8(vin), web3.fromUtf8(ein)).send({ from: accounts[0] })
    this.setState({ lastTokenId: tokenId })
  };
  
  storeValue = async () => {
    const { accounts, contract } = this.props
    await contract.methods.set(9).send({ from: accounts[0] })
    alert('Stored 5 into account')
  };

  getValue = async () => {
    const { accounts, contract } = this.props
    const response = await contract.methods.get().call({ from: accounts[0] })
    this.setState({ balance: response })
  };

  getEthBalance = async () => {
    const { web3, accounts } = this.props
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    this.setState({ ethBalance: balanceInWei / 1e18 })
  };

  render () {
    const { balance = 'N/A', ethBalance = 'N/A'} = this.state
    return (
      <div>
        <h1>Vehicle</h1>
        <div>
          current account : {this.props.accounts}
        </div>
        <div>
          last new tokenId : {this.props.lastTokenId}
        </div>

        <button onClick={this.storeValue}>Store 4 into account balance</button>
        <button onClick={this.getValue}>Get account balance</button>
        <button onClick={this.getEthBalance}>Get ether balance</button>
        <button onClick={this.newVehicleToken}>mintNewVehicleToken</button>
        <div>Account Balance: {balance}</div>
        <div>Ether Balance: {ethBalance}</div>
        <div>
          <Link href='/accounts'>
            <a>My Accounts</a>
          </Link>
        </div>
        <div>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Vehicles Page...</div>}
    render={({ web3, accounts, contract }) => (
      <Dapp accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
