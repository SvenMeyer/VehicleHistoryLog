# The React client needs a copy / symlink from `build/contracts` to `client/lib/contracts`
# as React can not access the .json files outside its (client) directory. 

rm -rf client/lib/contracts
cd client/lib
ln -s ../../build/contracts/ contracts
cd ../..
