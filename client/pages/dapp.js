import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'

class Dapp extends React.Component {
  state = {
    balance: undefined,
    ethBalance: undefined,
    lastSerial: undefined,
    vehicleData: undefined,
    model: undefined,
    vin: undefined,
    ein: undefined,
    logEntry_auditor: '', 
    logEntry_milage: '',
    logEntry_description: '', 
    logEntry_documentURI: ''
  };

  newVehicleToken = async () => {
    const { accounts, contract } = this.props
    const model = 'Porsche Cayenne'
    const vin = 'WP1AB29P64LA63732'
    const ein = 'AFD'
    const tokenId = await contract.methods.mintNewVehicleToken(web3.fromUtf8(model), web3.fromUtf8(vin), web3.fromUtf8(ein)).send({ from: accounts[0] })
    this.setState({ lastTokenId: tokenId })
  };
  
  /*
  storeValue = async () => {
    const { accounts, contract } = this.props
    await contract.methods.set(9).send({ from: accounts[0] })
    alert('Stored 5 into account')
  };
  */

  getVehicleData = async () => {
    const tokenId = 1;
    const { accounts, contract } = this.props
    const response = await contract.methods.getVehicleData(tokenId).call({ from: accounts[0] })
    console.log('getVehicleData(1) : response =', response)
    this.setState({ model: response[0], vin: response[1], ein: response[2] })
    console.log('model =', this.state.model)
  };

  getLastSerial = async () => {
    const { accounts, contract } = this.props
    const response = await contract.methods.getLastSerial().call({ from: accounts[0] })
    console.log('getLastSerial : response =', response)
    this.setState({ lastSerial: response })
    console.log('lastSerial =', this.state.lastSerial)
  };

  lastHistoryLog = async () => {
    const tokenId = 1;
    const { accounts, contract } = this.props
    const response = await contract.methods.getLogEntryLast(tokenId).call({ from: accounts[0] })
    console.log('lastHistoryLog(1) : response =', response)
    // this.setState({ logEntry_auditor: response[0], logEntry_milage: response[1], logEntry_description: response[2], logEntry_documentURI: response[3] })
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
        <h1><pre>VehicleLogHistory</pre></h1>
        <div>
          <pre>
            <Link href='/accounts'><a>[My Accounts]</a></Link>&nbsp;
            <Link href='/'><a>[Home]</a></Link>
          </pre>
        </div>
        <p />
        <div>
          <pre>current account : {this.props.accounts}&nbsp;
            <Link href={('https://rinkeby.etherscan.io/address/').concat(this.props.accounts)}><a target="_blank">[rinkeby.etherscan.io]</a></Link>
          </pre>
        </div>
        <p />
        <button onClick={this.newVehicleToken}>mintNewVehicleToken</button>&nbsp;&nbsp;
        <button onClick={this.getLastSerial}>getLastSerial</button>&nbsp;&nbsp;
        <button onClick={this.getVehicleData}>getVehicleData</button>&nbsp;&nbsp;
        <button onClick={this.lastHistoryLog}>lastHistoryLog</button>&nbsp;&nbsp;
        <button onClick={this.getEthBalance}>Get ether balance</button>
        <p />
        <pre>
          <div>last new tokenId : {this.state.lastSerial}</div>
          <div>Account Balance  : {balance}</div>
          <div>Ether Balance    : {ethBalance}</div>
          <p />
          <div><b>vehicleData: </b><br />
            model : {this.state.model}<br />
            vin   : {this.state.vin}<br />
            ein   : {this.state.ein}<br />        
          </div>
          <p />
          <div><b>lastHistoryLog: </b><br />
            logEntry_auditor      : {this.state.modlogEntry_auditorel}<br />
            logEntry_milage       : {this.state.logEntry_milage}<br />
            logEntry_description  : {this.state.logEntry_description}<br />
            logEntry_documentURI  : {this.state.logEntry_documentURI}<br />
          </div>
        </pre>
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
