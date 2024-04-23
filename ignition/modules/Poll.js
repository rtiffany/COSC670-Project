/* Run this to deploy the smart contract on chain 
 * 
 * Run: npx hardhat ignition deploy ignition/modules/Poll.js
 * */
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PollModule = buildModule("PollModule", (m) => {
  const poll = m.contract("Poll", [10, 100]);

  return { poll };
});

module.exports = PollModule;




// const { ethers } = require("hardhat");

// async function main() {
//     const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

//     // Deploy the contract
//     const currentTimestamp = Math.floor(Date.now() / 1000); // current timestamp in seconds
//     const startTime = currentTimestamp; // set start time to current timestamp
//     const endTime = currentTimestamp + 3600;
//     const Poll = await ethers.getContractFactory("Poll");
//     const pollContract = await Poll.deploy(startTime, endTime);
  

//     // Add a candidate
//     await pollContract.connect(owner).addCandidate("Candidate 1", addr1.address);
//     console.log("Candidate 1 added successfully.");

//     await pollContract.connect(owner).addCandidate("Candidate 2", addr2.address);
//     console.log("Candidate 2 added successfully.");

//     // Add a voter
//     await pollContract.connect(owner).addVoter(addr1.address);
//     console.log("Voter added successfully.");

//     // Start the vote
//     await pollContract.connect(owner).startVote();
//     console.log("Vote started.");

//     // Vote for a candidate
//     await pollContract.vote(0);
//     console.log("Voted for candidate.");

//     // End the vote
//     await pollContract.endVote();
//     console.log("Vote ended.");

//     // Tally the votes
//     const tally = await pollContract.tallyVotes();
//     console.log("Tally:", tally);
// }

// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
// });