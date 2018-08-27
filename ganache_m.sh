#! /bin/sh
# export HDWALLET_MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
echo "starting with HDWALLET_MNEMONIC : "
echo $HDWALLET_MNEMONIC
# -i or --networkId: Specify the network id ganache-cli will use to identify itself
# -e or --defaultBalanceEther: Amount of ether to assign each test account. Default is 100
# -a or --accounts: Specify the number of accounts to generate at startup
# -b or --blockTime: Specify blockTime in seconds for automatic mining
# -m : mnemonic for the wallet (accounts and private key will be derived from it)
# -p or --port: Port number to listen on. Defaults to 8545

# ganache-cli --db .ganache -i 1234 -e 100 -a 10 -b 1 -m "$HDWALLET_MNEMONIC"

ganache-cli -m "$HDWALLET_MNEMONIC"
