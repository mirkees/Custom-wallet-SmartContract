-This is a smart contract which contains most of the functionality that a normal Wallet has.

-This Contract was only made for practice purpose and is not yet deployed on the mainnet. 

-To test and deployed this smart contract I used the hardhat framework.

-I also implemented in the hardhat.config.js file, my API form Etherscan to get a verified contract.

-I have made a couple of Test to be sure that the functions are working properly.

-This wallet is using Ownable from OppenZeppelin.  

-This Wallet also contains a swap function to directly swap ERC20 Tokens on Uniswap using the 
UnsiwapV2Router02. I know, it's not the common way to implement a swap through uniswap, but as I said before 
it was for practice. 

-Feel free to test, adopt or do something else with this contract. If you want to improve this contract you can
add the ReentrancyGuard from OppenZeppelin. 

-Everyone who wants to deploy and use it on mainnet, is doing this on your own risk. 

-To get this all running the steps are as followed:

1. Start IDE
2. `npm install --save-dev hardhat`
3. `npx hardhat`
4. `npm install --save-dev dotenv` (is needed for the .env file, which gets ignored by uploading to GitHub)
5. setting up your .env with `RPC_URL` and `PRIVATE_KEY`
6. adding in you hardhat.config.js file => require("dotenv").config();
7. @nomicfoundation/hardhat-toolbox
8. @openzeppelin/contracts
9. @uniswap/v2-periphery

- here are the commondlines you will need to deploy or test:

  npx hardhat run scripts/deploy.js --network goerli (for deploying the contract )
  npx hardhat test ( independet of what the name of the .sol is you want to test ) 