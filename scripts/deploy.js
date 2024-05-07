const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.provider.getBalance(deployer.address);
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const ContractFactory = await hre.ethers.getContractFactory("Poll");
    const Contract = await ContractFactory.deploy();
    const contractAddress = await Contract.getAddress();
  
  console.log("Contract deployed to:", contractAddress);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();