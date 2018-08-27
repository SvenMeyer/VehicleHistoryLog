// import "truffle/DeployedAddresses.sol";
const ERC721Vehicle = artifacts.require('ERC721Vehicle');

// describe('ERC721Vehicle', (accounts) => {
contract('ERC721Vehicle', function (accounts) {

    const creator = accounts[0];
    const alice = accounts[1];
    const bob = accounts[2];
    const service = accounts[3];
    const emptyAddress = '0x0000000000000000000000000000000000000000';

    const tokenId = 1;
    const model = 'Porsche Cayenne'
    const vin = 'WP1AB29P64LA63732'
    const ein = 'AFD'

    // vc = ERC721Vehicle(DeployedAddresses.ERC721Vehicle());
    var vc;

    // web3 1.0 it might change to web3.utils.fromWei
    const price = web3.toWei(100, "ether");

    // to save costly space on the blovkchain, model, vin and ein have been defined as bytes32
    // Here we test web3, if it converts Ascii <-> bytes32 correctly
    // toAscii and fromAscii causes problem due to '0x00' padding at the end, so we use the UTF8 version
    // (update) actually not needed at the moment as bytes32 parameter were replaced by string
    it("web3.fromUtf8 > web3.toUtf8 should result in identical value", () => {
        assert.equal(model, web3.toUtf8(web3.fromUtf8(model)))
    });

    // Test to ...
    // 1) deploy contract
    // 2) check if contract exists / has a valid address
    // 3) creator of the contract has been set correctly

    it("deploys contract & sets a contract creator", async () => {
        vc = await ERC721Vehicle.new({ from: creator })
        // if it has been deployed successfully then it should have an address
        assert.ok(await vc.address);
        assert.equal(await vc.creator.call(), creator)
    });

    // Test to mint a new (first) token for a a new vehicle
    // Check if event will be emitted
    // Check if tokenId/serial = 1

    it("should mint a ERC721 token for a new car", async () => {
        var eventEmitted = false
        var event = vc.EventNewVehicleToken()
        await event.watch((err, res) => {
            // tokenId = res.args.tokenId.toString(10) // ???
            eventEmitted = true
        })

        // convert parameter to bytes32
        // https://ethereum.stackexchange.com/questions/23058/web3-return-bytes32-string
        // await vc.mintNewVehicleToken(web3.fromUtf8(model), web3.fromUtf8(vin), web3.fromUtf8(ein), { from: creator });
        await vc.mintNewVehicleToken(model, vin, ein, { from: creator });
        assert.equal(await vc.getLastSerial.call(), 1, "the serial number of the last created vehicle token should be 1")
    })

    // Test to add a HistoryLog entry for a specified tokenId/vehicle
    // Retrieve the (now last) entry again and check if the data is identical

    it("should add an HistoryLog entry", async () => {
        assert.equal(await vc.getLogEntryCount(tokenId), 0, "getLogEntryCount should be 0");
        const milage = 10;
        const description = "out of the factory";
        const URI = "https://documents.com/entry-1234.pdf";
        const length = vc.appendLogEntry(tokenId, milage, description, URI, { from: creator })
        assert.equal(await vc.getLogEntryCount(tokenId), 1, "getLogEntryCount should be 1");
        const result = await vc.getLogEntryLast.call(1);
        assert.equal(result[0], creator, 'auditor of first entry should be creator');
        assert.equal(result[1].toNumber(), milage, 'the price of the last added item does not match the expected value')
        assert.equal(result[2], description, "description should match the parameter at creation time");
        assert.equal(result[3], URI, "URI should match the parameter at creation time");
    })

    // Retrieve Data for a specified tokenId/vehicle and compare with test data

    it("should get getVehicleData", async () => {
        result = await vc.getVehicleData(tokenId);
        // toAscii does not work as it will convert trailing '00' to \0000
        assert.equal(result[0], model, "retrieved getVehicleData.vin not identical with stored vin")
        assert.equal(result[1], vin, "retrieved getVehicleData.vin not identical with stored vin")
        assert.equal(result[2], ein, "retrieved getVehicleData.ein not identical with stored ein")
    })

    // needs web3@1.0.0 ABIencoderV2
    // truffle v4 does not support web3 >= 1.0.0 (just)
    // https://github.com/ethereum/web3.js/issues/1241
    /*
    it("should get getVehicleData_Struct", async () => {
        const vehicleData = await vc.getVehicleData_Sruct(tokenId);
        console.log(vehicleData);
    })
    */
});
