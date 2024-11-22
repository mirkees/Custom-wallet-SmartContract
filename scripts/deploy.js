
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
