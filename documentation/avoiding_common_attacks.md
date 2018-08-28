# VehicleHistoryLog

## Avoiding Common Attacks

### External calls
No external calls to unknown contracts are being made

### Illegal Parameter
Parameters to all functions are being checked with corresponding `require(...)` statements as well as a modifier to check for valid token and tokenIds `onlyValidToken(_tokenId)`.

### Fallback Function
Fallback function is simple, keeps sent ether and emits an event to send out a notification.

### Explicitly mark visibility in functions and state variables
done

### Race Conditions / Reentrancy
Race Conditions and Reentrancy attacks are being avoided by relying on the multiple times reviewed library code from OpenZeppelin.

### Integer Overflow and Underflow
Problems caused by Overflow or Underflow of uint are covered by using SafeMath (defined in ERC721BasicToken.sol)
`using SafeMath for uint256;`

### Timestamp Dependence
Not used, so it not a possible attack scenario.

### Transaction-Ordering Dependence (TOD) / Front Running
Not used, so it not a possible attack scenario.

### DoS with (Unexpected) revert / DoS with Block Gas Limit
Only `SafeTransferFrom(...)` is used to prevent such attacks.

