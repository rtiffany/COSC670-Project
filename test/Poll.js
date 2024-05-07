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
    poll = await Poll.deploy();
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


    await poll.createPoll(
      "Past Poll",
      "Description of the past poll",
      ["Past Candidate 1", "Past Candidate 2"],
      [candidate1.address, candidate2.address],
      Math.floor(Date.now() / 1000) - 120, // Start time 2 minutes ago
      Math.floor(Date.now() / 1000) - 60 // End time 1 minute ago
    );

    await poll.createPoll(
      "Live Poll",
      "Description of the live poll",
      ["Live Candidate 1", "Live Candidate 2"],
      [candidate1.address, candidate2.address],
      Math.floor(Date.now() / 1000) - 60, // Start time 1 minute ago
      Math.floor(Date.now() / 1000) + 60 // End time 1 minute from now
    );


    await poll.createPoll(
      "Future Poll",
      "Description of the future poll",
      ["Future Candidate 1", "Future Candidate 2"],
      [candidate1.address, candidate2.address],
      Math.floor(Date.now() / 1000) + 60, // Start time 1 minute from now
      Math.floor(Date.now() / 1000) + 120 // End time 2 minutes from now
    );



    const [livePollNames, livePollDescriptions, livePollCandidates] = await poll.getLivePolls();

    // Assert that there is only one live poll
    expect(livePollNames.length).to.equal(1);
    expect(livePollDescriptions.length).to.equal(1);
    expect(livePollCandidates.length).to.equal(1);

    // Assert live poll details
    expect(livePollNames[0]).to.equal("Live Poll");
    expect(livePollDescriptions[0]).to.equal("Description of the live poll");
    expect(livePollCandidates[0].length).to.equal(2);
    expect(livePollCandidates[0][0]).to.equal("Live Candidate 1");
    expect(livePollCandidates[0][1]).to.equal("Live Candidate 2");



    const [name, description, candidates] = await poll.getPollDetails("Test Poll");

    const pollData = await poll.polls("Test Poll");

    expect(name).to.equal("Test Poll");
    expect(description).to.equal("Description of the test poll");
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Candidate 1");
    expect(candidates[1].name).to.equal("Candidate 2");
    expect(candidates[0].candidateAddress).to.equal(candidate1.address);
    expect(candidates[1].candidateAddress).to.equal(candidate2.address);

    expect(pollData.startTime).to.be.greaterThan(Math.floor(Date.now() / 1000));
    expect(pollData.endTime).to.be.greaterThan(pollData.startTime);

    await poll.pollExists("Test Poll");
   // expect(pollData.candidates.length).to.equal(2);
  });

  it("Should allow voters to vote", async function () {
    const currentTimestamp = (await ethers.provider.getBlock('latest')).timestamp;
    console.log("the current timestamp is:",currentTimestamp);
    console.log("the current timestamp is:",);
    const startDelay = 0; // 60 seconds (1 minute) delay
    const startTime = currentTimestamp + startDelay;
   
    await poll.createPoll(
      "Test Poll",
      "Description of the test poll",
      ["Candidate 1", "Candidate 2"],
      [candidate1.address, candidate2.address],
      startTime, // Set the calculated start time
      startTime + 20 // End time 2 minutes from the start time
    );

    // Start the vote
    //await poll.connect(manager).startVote();
     // Wait for the start time of the poll
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 60 seconds (1 minute)
    const currentTimestamp2 = (await ethers.provider.getBlock('latest')).timestamp;
    console.log(currentTimestamp2);
    // Voter 1 votes for Candidate 1
    await poll.connect(voter1).vote("Test Poll", candidate1.address);

    // Voter 2 votes for Candidate 2
    await poll.connect(voter2).vote("Test Poll", candidate2.address);

    const votes = await poll.getVotes("Test Poll");
    expect(votes[0]).to.equal(1); // Candidate 1 received 1 vote
    expect(votes[1]).to.equal(1); // Candidate 2 received 1 vote
  });
});
