# VehicleHistoryLog

## Design Patterns

### fail early by using require
Parameters to all functions are being checked with corresponding `require(...)` statements as well as a modifier to check for valid token and tokenIds `onlyValidToken(_tokenId)`.

### Restricting Access
Important administrative functions are restricted and can only be executed by the creator (owner) of the contract.

### Auto Deprecation
Not a requirement in this project

### Mortal
function kill implemented to destroy ERC721Vehicle contract and return all funds to creator (=owner of contract)

### Pull over Push Payments
All value transfer functions have been implemented as "transferFrom"

### Circuit Breaker
`function setContractActive()` and `function setContractInactive()` implemented. If `stopped = true` in ERC721Vehicle contract, then no transfers are possible. Also in that case funding the contract is halted as well with all payments reverted immediately.

### State Machine
The relevant state for this application is (just) who owns the token (=vehicle) which determines what the owner can do. This is handled by access restrictions to functions (see above 'Restricting Access').


