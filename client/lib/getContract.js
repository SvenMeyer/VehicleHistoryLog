const getContractInstance = async (web3, contractDefinition) => {
  // get network ID and the deployed address
  const networkId = await web3.eth.net.getId()
  console.log( {networkId} );

  var deployedAddress;

  if (networkId == 4) {
    console.log('Will use the deployed contract on Rinkeby Network');
    deployedAddress = '0xc722344f2fba0effb97550f075481041b6e00909';
  }
  else {
    deployedAddress = contractDefinition.networks[networkId].address;
  }
  console.log('deployedAddress =', deployedAddress);

  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
