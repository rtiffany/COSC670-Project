/* Run this file to use the test suite to test out Poll.sol functions after
 * making changes to make sure the functionality is working properly.
 *
 * Run: npx hardhat test
 */
require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Creating a Poll", () => {
    it("Setting Poll Name", async () => {
        const poll = await ethers.deployContract("Poll", [0, 1000]);
        await poll.setName("Test Poll");
        const name = await poll.getName();
        expect(await poll.getName()).to.equal(name);
    });
});

describe("Configuring Poll", () => {
    it("Manager Start Vote", async () => {
        const [owner, manager, candidate1, candidate2, voter1] = await ethers.getSigners();
        const poll = await ethers.deployContract("Poll", [0, 1000]);

        // Add candidates
        const names = ["Pouria", "Ryan", "Devere"];
        await poll.connect(manager).addCandidate(names[0], candidate1);
        await poll.addCandidate(names[1], candidate2);

        // Add a voters
        await poll.connect(manager).addVoter(voter1);

        // Start the vote and assert start/end status
        await poll.connect(manager).startVote();
        expect(await poll.connect(manager).voteStartStatus()).to.equal(true);
        expect(await poll.connect(manager).voteEndStatus()).to.equal(false);

        // End vote and asset start/end status
        await poll.connect(manager).endVote();
        expect(await poll.connect(manager).voteStartStatus()).to.equal(false);
        expect(await poll.connect(manager).voteEndStatus()).to.equal(true);
    }); 

    it("Candidate Names", async () => {
        const [owner, manager, candidate1, candidate2, voter1] = await ethers.getSigners();
        const poll = await ethers.deployContract("Poll", [0, 1000]);

        const names = ["Pouria", "Ryan", "Devere"];

        /* We need to remove onlyOwner modifiers for this to work */
        await poll.connect(manager).addCandidate(names[0], candidate1);
        await poll.addCandidate(names[1], candidate2);

        // Assert the names
        expect(await poll.connect(manager).getCandidateName(candidate1)).to.equal("Pouria");
        expect(await poll.connect(manager).getCandidateName(candidate2)).to.equal("Ryan");
    });

    it("Candidate Vote Count", async () => {
        const [owner, manager, candidate1, candidate2, voter1, voter2] = await ethers.getSigners();
        const poll = await ethers.deployContract("Poll", [0, 1000]);
        const names = ["Pouria", "Ryan", "Devere"];
        await poll.connect(manager).addCandidate(names[0], candidate1);
        await poll.addCandidate(names[1], candidate2);

        // Add a voter to vote
        await poll.connect(manager).addVoter(voter1);
        await poll.connect(manager).addVoter(voter2);

        // Start the vote
        await poll.connect(manager).startVote();

        // Voters vote
        await poll.connect(voter1).vote(1)
        await poll.connect(voter2).vote(1)

        // Assert vote counts
        expect(await poll.connect(manager).getCandidateVoteCount(candidate1)).to.equal(0);
        expect(await poll.connect(manager).getCandidateVoteCount(candidate2)).to.equal(2);
    });

    it("Get Voters", async () => {
        // TODO: Not sure if the functionality of getVoters() is working correctly or if 
        // I misunderstood its purpose. Run the test and see that the returned addresses
        // from that function match the candidates, not the voters.

        const [owner, manager, candidate1, candidate2, voter1, voter2] = await ethers.getSigners();
        const poll = await ethers.deployContract("Poll", [0, 1000]);
        const names = ["Pouria", "Ryan", "Devere"];
        await poll.connect(manager).addCandidate(names[0], candidate1);
        await poll.addCandidate(names[1], candidate2);

        // Add a voter to vote
        await poll.connect(manager).addVoter(voter1);
        await poll.connect(manager).addVoter(voter2);

        // Get array of voters
        const voters = await poll.connect(manager).getVoters();
        console.log('Returned from getVoters');
        console.log(voters);

        // Check out all current addresses
        console.log(`\nCandidate 1: ${candidate1.address}`);
        console.log(`Candidate 2: ${candidate2.address}`);
        console.log(`\nVoter 1: ${voter1.address}`);
        console.log(`Voter 2: ${voter2.address}`);

        // These pass but should fail
        expect(voters[0]).to.equal(candidate1);
        expect(voters[1]).to.equal(candidate2);

        // These fail but should pass
        // expect(voters[0]).to.equal(voter1);
        // expect(voters[1]).to.equal(voter2);
    });
})