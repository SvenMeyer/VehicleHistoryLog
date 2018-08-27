const ERC721Vehicle = artifacts.require('./ERC721Vehicle.sol')



contract('ERC721Vehicle', (accounts) => {

// just tests basic functionality of contract to store and retrieve a value using JavaScript

  it('...should store the value 123.', async () => {
    const ERC721VehicleInstance = await ERC721Vehicle.deployed()

    // Set value of 89
    await ERC721VehicleInstance.set(123, {from: accounts[0]})

    // Get stored value
    const storedData = await ERC721VehicleInstance.get.call()

    assert.equal(storedData, 123, 'The value 89 was not stored.')
  })
})
