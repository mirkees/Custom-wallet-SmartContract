const {expect} = require("chai");
const hre = require("hardhat")
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const ethers = require("ethers");




describe('Custom_Wallet', function (){
    let token;
    let contract;
    let owner;
    let otherAccount;

    beforeEach(async () => {
        // Deploying MyToken
        const Token = await hre.ethers.getContractFactory("Token_For_Testing");
        token = await Token.deploy();

        //Deploy Custom_Wallet Contract and getting Wallets
        const Custom_Wallet = await hre.ethers.getContractFactory("Custom_Wallet");
        contract = await Custom_Wallet.deploy();
        [owner, otherAccount] = await hre.ethers.getSigners();

    });

    describe("Deployment", function (){
        it('should set the right owner',async function () {
            expect(await contract.owner()).to.equal(owner.address);
        });
    });

    describe("deposit Token and withdraw token", function(){
        it('should deposit 100 tokens to the contract and then withdraw 100 tokens to the owner',async function () {

            const tokenAddress = await token.getAddress();
            const contractAddress = await contract.getAddress();
            const amountToDeposit = hre.ethers.parseUnits("100", 18);
            const amountToWithdraw = hre.ethers.parseUnits("100", 18);
            const initialBalance = await token.balanceOf(owner.address);

            console.log(`Initial Balance: ${initialBalance}`);
            console.log(`Token Address: ${tokenAddress}`);
            console.log("Owner address:", owner.address);
            console.log(`Contract Address: ${contractAddress}`);

            // Deposit Tokens
            await token.connect(owner).approve(contractAddress, amountToDeposit);
            await contract.connect(owner).depositToken(tokenAddress, amountToDeposit);
            const balanceOfContract = await token.balanceOf(contractAddress);
            expect(balanceOfContract).to.equal(amountToDeposit);

            // withdraw Tokens
            await contract.connect(owner).withdrawToken(tokenAddress, amountToWithdraw);
            const balanceOfOwner = await token.balanceOf(owner.address);
            console.log("Balance after withdrawal:", balanceOfOwner.toString());
            expect(balanceOfOwner).to.equal(initialBalance);
        });
    });
    describe("deposit ETH and withdraw ETH to the owner address", function (){
        it('should deposit 0.5 ETH and then Withdraw them.',async function () {
            const contractAdress = await contract.getAddress();
            console.log(`Contract Address ${contractAdress}`);
            const EthAmount = hre.ethers.parseEther("0.5");
            // Deposit ETH
            await owner.sendTransaction({
                to: contractAdress,
                value: EthAmount,
            })
            const contractBalance = await hre.ethers.provider.getBalance(contractAdress);
            expect(EthAmount.toString()).to.equal((await contractBalance).toString());

            // Withdraw ETH
            const contractBalanceBefore = await hre.ethers.provider.getBalance(contractAdress);
            await contract.connect(owner).withdrawETH(EthAmount);

            const contractBalanceAfter = await hre.ethers.provider.getBalance(contractAdress);
            const expectedBalanceAfterWithdrawal = hre.ethers.parseEther("0");
            expect(contractBalanceAfter.toString()).to.equal((expectedBalanceAfterWithdrawal).toString());

        });
    });

    describe("getting the balances of the Tokens and also the ETH balance", function (){
        it('should deposit 10 tokens and 0.5 ETH then getting the balances of those',async function () {
            const contractAdress = await contract.getAddress();
            const tokenAddress = await token.getAddress();
            console.log(`Contract Address ${contractAdress}`);
            const amountTokenToDeposit = hre.ethers.parseUnits("100", 18);

            // Deposit ETH
            const EthAmount = hre.ethers.parseEther("0.5");
            await owner.sendTransaction({
                to: contractAdress,
                value: EthAmount,
            })
            // Deposit Tokens
            await token.connect(owner).approve(contractAdress, amountTokenToDeposit);
            await contract.connect(owner).depositToken(tokenAddress, amountTokenToDeposit);

            const TokenBalance = await contract.getBalanceOfToken(tokenAddress);
            const EthBalance = await contract.getBalanceETH();

            expect(amountTokenToDeposit).to.equal(TokenBalance);
            expect(EthAmount).to.equal(EthBalance);


        });


    });

});

