const ERC721Vehicle = artifacts.require('ERC721Vehicle');

contract('ERC721Vehicle', function(accounts) {

    const creator = accounts[0];
    const alice   = accounts[1];
    const bob     = accounts[2];
    const service = accounts[3];
    const emptyAddress = '0x0000000000000000000000000000000000000000';

	var vc;
    var tokenId;
	const price = web3.toWei(100, "ether");

	it("sets a contract creator", async () => {
		vc = await ERC721Vehicle.deployed()
		assert.equal(await vc.creator.call(), creator)
	});

	it("should mint a ERC721 token for a new car", async () => {
		// const vc = await ERC721Vehicle.deployed()

		var eventEmitted = false

		var event = vc.NewVehicleToken()
		await event.watch((err, res) => {
			tokenId = res.args.tokenId.toString(10)
			eventEmitted = true
		})

		const name = "Porsche 911"

		await vc.mintNewVehicleToken(1001, 2001); //, { from: alice })

		const serial = await vc.getLastSerial.call()

		assert.equal(serial, 1, "the serial number of the last created vehicle token should be 1")
/*
		assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
		assert.equal(result[2].toString(10), price, 'the price of the last added item does not match the expected value')
		assert.equal(result[3].toString(10), 0, 'the state of the item should be "For Sale", which should be declared first in the State Enum')
		assert.equal(result[4], alice, 'the address adding the item should be listed as the seller')
		assert.equal(result[5], emptyAddress, 'the buyer address should be set to 0 when an item is added')
		assert.equal(eventEmitted, true, 'adding an item should emit a For Sale event')
*/
	})
});


/* OLD ------------------------------------------------ */
/*	
    it("should add an item with the provided name and price", async() => {
        const ERC721Vehicle = await ERC721Vehicle.deployed()

        var eventEmitted = false

        var event = ERC721Vehicle.ForSale()
        await event.watch((err, res) => {
            tokenId = res.args.tokenId.toString(10)
            eventEmitted = true
        })

        const name = "Porsche 911"

        await ERC721Vehicle.addItem(name, price, {from: alice})

        const result = await ERC721Vehicle.fetchItem.call(tokenId)

        assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
        assert.equal(result[2].toString(10), price, 'the price of the last added item does not match the expected value')
        assert.equal(result[3].toString(10), 0, 'the state of the item should be "For Sale", which should be declared first in the State Enum')
        assert.equal(result[4], alice, 'the address adding the item should be listed as the seller')
        assert.equal(result[5], emptyAddress, 'the buyer address should be set to 0 when an item is added')
        assert.equal(eventEmitted, true, 'adding an item should emit a For Sale event')
    })

    it("should allow someone to purchase an item", async() => {
        const ERC721Vehicle = await ERC721Vehicle.deployed()

        var eventEmitted = false

        var event = ERC721Vehicle.Sold()
        await event.watch((err, res) => {
            tokenId = res.args.tokenId.toString(10)
            eventEmitted = true
        })

        const amount = web3.toWei(2, "ether")

        var aliceBalanceBefore = await web3.eth.getBalance(alice).toNumber()
        var bobBalanceBefore = await web3.eth.getBalance(bob).toNumber()

        await ERC721Vehicle.buyItem(tokenId, {from: bob, value: amount})

        var aliceBalanceAfter = await web3.eth.getBalance(alice).toNumber()
        var bobBalanceAfter = await web3.eth.getBalance(bob).toNumber()

        const result = await ERC721Vehicle.fetchItem.call(tokenId)

        assert.equal(result[3].toString(10), 1, 'the state of the item should be "Sold", which should be declared second in the State Enum')
        assert.equal(result[5], bob, 'the buyer address should be set bob when he purchases an item')
        assert.equal(eventEmitted, true, 'adding an item should emit a Sold event')
        assert.equal(aliceBalanceAfter, aliceBalanceBefore + parseInt(price, 10), "alice's balance should be increased by the price of the item")
        assert.isBelow(bobBalanceAfter, bobBalanceBefore - price, "bob's balance should be reduced by more than the price of the item (including gas costs)")
    })

    it("should allow the seller to mark the item as shipped", async() => {
        const ERC721Vehicle = await ERC721Vehicle.deployed()

        var eventEmitted = false

        var event = ERC721Vehicle.Shipped()
        await event.watch((err, res) => {
            tokenId = res.args.tokenId.toString(10)
            eventEmitted = true
        })

        await ERC721Vehicle.shipItem(tokenId, {from: alice})

        const result = await ERC721Vehicle.fetchItem.call(tokenId)

        assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
        assert.equal(result[3].toString(10), 2, 'the state of the item should be "Shipped", which should be declared third in the State Enum')
    })

    it("should allow the buyer to mark the item as received", async() => {
        const ERC721Vehicle = await ERC721Vehicle.deployed()

        var eventEmitted = false

        var event = ERC721Vehicle.Received()
        await event.watch((err, res) => {
            tokenId = res.args.tokenId.toString(10)
            eventEmitted = true
        })

        await ERC721Vehicle.receiveItem(tokenId, {from: bob})

        const result = await ERC721Vehicle.fetchItem.call(tokenId)

        assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
        assert.equal(result[3].toString(10), 3, 'the state of the item should be "Received", which should be declared fourth in the State Enum')
    })
*/

