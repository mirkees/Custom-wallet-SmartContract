
# Custom Wallet Smart Contract Documentation 

A practice smart contract replicating wallet functionality, built using the Hardhat framework. It includes features like ERC20 token swapping via Uniswap's UniswapV2Router02, ownership management with OpenZeppelin's Ownable, and verified deployment using Etherscan's API. Tested for functionality, it is intended for learning purposes and not deployed on mainnet. Improvements like adding OpenZeppelin's ReentrancyGuard are suggested. Use and deploy at your own risk.

## Overview

The `Custom_Wallet` smart contract allows the owner to:

1. Deposit and withdraw ERC-20 tokens.
2. Deposit and withdraw ETH.
3. Check the balances of tokens and ETH stored in the contract.
4. Swap tokens using Uniswap

## Features

- Token Managment: Deposit and withdraw ERC-20 Tokens.
- ETH managment: Deposit and withdraw ETH.
- Balance Queries: Retrieves balances of tokens and ETH.
- Access Control: Only the contract owner can withdraw funds.

## ABI 

The ABI gets generated during the compiling process. You will find them in the `artifacts` -> `contracts` -> `Custom_Wallet` -> `Custom_Wallet.json` file.


## Functions

1. Depositing ETH

`function depositToken(address _token, uint256 _amount) external;`

Parameters:

_token: The address of the ERC-20 token.
_amount: The number of tokens to deposit.

2. Withdraw Token

`function withdrawToken(address _token, uint256 _amount) external onlyOwner;`

Parameters:

_token: The address of the ERC-20 token.
_amount: The number of tokens to withdraw.

3. Deposit ETH

ETH can be send directly to the contract

4. Withdraw ETH

`function withdrawETH(uint256 _amount) external onlyOwner;`

Parameters:

_amount: The amount of ETH to withdraw.


5. Get Token Balance

`function getBalanceOfToken(address _token) external view returns (uint256);`

Parameters:

_token: The address of the ERC-20 token.

6. Get ETH Balance

`function getBalanceETH() external view returns (uint256);`


## Tests

1. Deplyoment

Tests whether the contract sets the correct owner upon deployment.

`expect(await contract.owner()).to.equal(owner.address);`

2. Token Deposit and Withdraw

Tests the functionality of depositing and withdrawing ERC-20 tokens.

```
await token.connect(owner).approve(contractAddress, amountToDeposit);
await contract.connect(owner).depositToken(tokenAddress, amountToDeposit);

const balanceOfContract = await token.balanceOf(contractAddress);
expect(balanceOfContract).to.equal(amountToDeposit);

await contract.connect(owner).withdrawToken(tokenAddress, amountToWithdraw);
expect(await token.balanceOf(owner.address)).to.equal(initialBalance);
```

3. ETH Deposit and Withdrawal


Tests the functionality of depositing and withdrawing ETH.

```
await owner.sendTransaction({
  to: contractAddress,
  value: ethers.utils.parseEther("0.5"),
});

expect(await contract.getBalanceETH()).to.equal(ethers.utils.parseEther("0.5"));

await contract.connect(owner).withdrawETH(ethers.utils.parseEther("0.5"));
expect(await contract.getBalanceETH()).to.equal(ethers.utils.parseEther("0"));
```

4. Balance Queries

Tests wether the contract returns the correct balances.

```
expect(await contract.getBalanceOfToken(tokenAddress)).to.equal(amountTokenToDeposit);
expect(await contract.getBalanceETH()).to.equal(ethers.utils.parseEther("0.5"));
```


## Setup and Usage

1. Install HardHat `npm install --save-dev hardhat`

2. Install dotenv `npm install --save-dev dotenv` (is needed for the .env file, which gets ignored by uploading to GitHub)

3. Install dependencies `npm install`

4. Configure Enviroment

Create a .env file for:

- RPC_URL= <your rpc url>
- PRIVATE_KEY= <your private key>
- ETHERSCAN_KEY <your etherscan api key>

5. Compile the contracts `npx hardhat compile`

6. Deploy the Contracts `npx hardhat run scripts/deploy.js --network <network_name>`

7. Run Tests `npx hardhat test`



