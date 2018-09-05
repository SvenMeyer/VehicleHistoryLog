import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'

class Dapp extends React.Component {
  state = {
    value: undefined,
    ethBalance: undefined,
    lastSerial: 0,
    vehicleData: undefined,
    model: undefined,
    vin: undefined,
    ein: undefined,
    logEntry_auditor: '', 
    logEntry_milage: '',
    logEntry_description: '', 
    logEntry_documentURI: '',
    networkId: ''
  };
  
  storeValue = async () => {
    const { accounts, contract } = this.props
    console.log('contract :', contract);
    console.log('accounts :', accounts);
    await contract.methods.set(5).send({ from: accounts[0] })
    // alert('Stored 5 into variable >value<')
  };

  getValue = async () => {
    const { accounts, contract } = this.props
    console.log('contract :', contract);
    console.log('accounts :', accounts);
    const response = await contract.methods.get().call({ from: accounts[0] })
    this.setState({ value: response })
  };

  newVehicleToken = async () => {
    console.log('newVehicleToken ------------------------')
    console.log(this.state.lastSerial)
    const oldSerial = this.state.lastSerial;
    const { accounts, contract } = this.props
    const model = 'Porsche Cayenne'
    const vin = 'WP1AB29P64LA63732'
    console.log({ oldSerial })
    const newSerial = oldSerial + 1
    console.log({ newSerial })
    const ein = newSerial.toString()
    console.log({ein})
    const tokenId = await contract.methods.mintNewVehicleToken(model, vin, ein ).send({ from: accounts[0] })
    this.setState({ lastTokenId: tokenId })
  };

  getVehicleData = async () => {
    console.log('getVehicleData -------------------------')
    console.log(this.state.lastSerial)
    const tokenId = Number(this.state.lastSerial);
    console.log({ tokenId })
    const { accounts, contract } = this.props
    const response = await contract.methods.getVehicleData(tokenId).call({ from: accounts[0] })
    console.log('getVehicleData(1) : response =', response)
    this.setState({ model: response[0], vin: response[1], ein: response[2] })
    console.log('model =', this.state.model)
  };

  getLastSerial = async () => {
    console.log('getLastSerial -------------------------')
    console.log(this.state.lastSerial)
    const { accounts, contract } = this.props
    const response = await contract.methods.getLastSerial().call({ from: accounts[0] })
    console.log('getLastSerial : response =', response)
    this.setState({ lastSerial: Number(response) })
    console.log({response})
    console.log('lastSerial =', this.state.lastSerial)
  };

  lastHistoryLog = async () => {
    const tokenId = 1;
    const { accounts, contract } = this.props
    const response = await contract.methods.getLogEntryLast(tokenId).call({ from: accounts[0] })
    console.log('lastHistoryLog(1) : response =', response)
    this.setState({ logEntry_auditor: response[0], logEntry_milage: response[1], logEntry_description: response[2], logEntry_documentURI: response[3] })
  };

  getEthBalance = async () => {
    const { web3, accounts } = this.props
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    this.setState({ ethBalance: balanceInWei / 1e18 })
  };

  getNetworkId = async () => {
    networkId = await web3.eth.net.getId();
    this.setState({ networkId: networkId })
  };


  render () {

    // web3.eth.getAccounts().then(console.log);

    const { value = 'N/A', lastSerial = 'N/A', ethBalance = 'N/A'} = this.state

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

        <pre>
          current account : {this.props.accounts} &nbsp;
          <Link href={('https://rinkeby.etherscan.io/address/').concat(this.props.accounts)}><a target="_blank">[rinkeby.etherscan.io]</a></Link>
        </pre>
          
        <pre>
          <p />
          <button onClick={this.getEthBalance}>getEthBalance</button> &nbsp;
          Ether Balance : {ethBalance}
        </pre>

        <pre>
          <button onClick={this.storeValue}>Basic Test - Store a value (5)</button> &nbsp;&nbsp;
          <button onClick={this.getValue}>Basic Test - Retrieve value</button> &nbsp;&nbsp;
          Test - value : {value}
        </pre>

        <pre>
          <button onClick={this.getLastSerial}>get last new tokenId</button> &nbsp; last new tokenId : {lastSerial}
        </pre>
        
        <pre>  
          <p />
          <p />
          <button onClick={this.newVehicleToken}>newVehicleToken</button>&nbsp;&nbsp;
          
          <button onClick={this.getVehicleData}>getLastVehicleData</button>&nbsp;&nbsp;
          <p />

          <div><b>vehicleData: </b><br />
            model : {this.state.model}<br />
            vin   : {this.state.vin}<br />
            ein   : {this.state.ein}<br />        
          </div>

          <p />
          <div>
            <Link href={"/vehicles/new"}><a>NEW PAGE => /vehicles/new</a></Link>
          </div>

          <div>
            <h2>Vehicle List</h2>
            <p />
            <Link href={"/vehicles/list"}><a>NEW PAGE => /vehicles/list</a></Link>
          </div>

          <p />
          <hr />

          <p />
          <button onClick={this.lastHistoryLog}>newHistoryLog - not yet implemented</button>&nbsp;&nbsp;
          <button onClick={this.lastHistoryLog}>lastHistoryLog</button>&nbsp;&nbsp;
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
