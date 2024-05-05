const { expect } = require("chai");

describe("Poll Contract", function () {
  let Poll;
  let poll;
  let owner;
  let manager;
  let voter1;
  let voter2;
  let candidate1;
  let candidate2;

  beforeEach(async function () {
    [owner, manager, voter1, voter2, candidate1, candidate2] = await ethers.getSigners();
    Poll = await ethers.getContractFactory("Poll");
    poll = await Poll.deploy(0, 1000);
  });

  it("Should create a poll", async function () {
    await poll.createPoll(
      "Test Poll",
      "Description of the test poll",
      ["Candidate 1", "Candidate 2"],
      [candidate1.address, candidate2.address],
      Math.floor(Date.now() / 1000) + 60, // Start time 1 minute from now
      Math.floor(Date.now() / 1000) + 120 // End time 2 minutes from now
    );

    const pollData = await poll.polls("Test Poll");
    expect(pollData.name).to.equal("Test Poll");
    expect(pollData.description).to.equal("Description of the test poll");
    expect(pollData.startTime).to.be.greaterThan(Math.floor(Date.now() / 1000));
    expect(pollData.endTime).to.be.greaterThan(pollData.startTime);
   // expect(pollData.candidates.length).to.equal(2);
  });

  it("Should allow voters to vote", async function () {
    this.timeout(90000);
    const currentTimestamp = (await ethers.provider.getBlock('latest')).timestamp;
    console.log("the current timestamp is:",currentTimestamp);
    console.log("the current timestamp is:",);
    const startDelay = 10; // 60 seconds (1 minute) delay
    const startTime = currentTimestamp + startDelay;
   
    await poll.createPoll(
      "Test Poll",
      "Description of the test poll",
      ["Candidate 1", "Candidate 2"],
      [candidate1.address, candidate2.address],
      startTime, // Set the calculated start time
      startTime + 120 // End time 2 minutes from the start time
    );

    // Start the vote
    //await poll.connect(manager).startVote();
     // Wait for the start time of the poll
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 60 seconds (1 minute)
    const currentTimestamp2 = (await ethers.provider.getBlock('latest')).timestamp;
    console.log(currentTimestamp2);
    // Voter 1 votes for Candidate 1
    await poll.connect(voter1).vote("Test Poll", 0);

    // Voter 2 votes for Candidate 2
    await poll.connect(voter2).vote("Test Poll", 1);

    const votes = await poll.tallyVotes("Test Poll");
    expect(votes[0]).to.equal(1); // Candidate 1 received 1 vote
    expect(votes[1]).to.equal(1); // Candidate 2 received 1 vote
  });
});
