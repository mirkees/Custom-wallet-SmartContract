// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function main() {

  const Custom_Wallet = await hre.ethers.getContractFactory("Custom_Wallet");
  const contract = await Custom_Wallet.deploy();
  const contractAddress = await contract.getAddress();
  console.log(`Deployed contract address: ${contractAddress}`);


  await sleep(45 * 1000);

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  })
}
main();
