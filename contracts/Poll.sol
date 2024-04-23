pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Poll {
    address public electionManager;
    mapping(address => Voter) public voters;
    uint256 public voterCount;
    string name;

    struct Candidate {
        string name;
        address candidateAddress;
        uint256 voteCount;
    }

    struct Voter {
        bool voted;
    }

    struct Proposal {
        string name;
        string description;
    }

    Candidate[] public candidates;
    Proposal[] public proposals;

    bool privateVote;
    bool public voteStarted;
    bool public voteEnded;
    uint256 public startTime;
    uint256 public endTime;

    constructor(uint256 _startTime, uint256 _endTime) {
        electionManager = msg.sender;
        startTime = _startTime;
        endTime = _endTime;
    }

    modifier onlyOwner() {
        require(msg.sender == electionManager, "Only the election manager can perform this operation.");
        _;
    }

    function getAddress() public view returns(address) {
        return address(this);
    }

    function setName(string memory _name) external {
        name = _name;
    }

    function getName() external view returns(string memory) {
        return name;
    }

    // function addCandidate(string memory _name, address _candidateAddress) public onlyOwner {
    //     candidates.push(Candidate(_name, _candidateAddress, 0));
    //     console.log("Candidate %s added!", _name);
    // }

    function addCandidate(string memory _name, address _candidateAddress) public {
        candidates.push(Candidate(_name, _candidateAddress, 0));
    }

    function getCandidateName(address _candidateAddress) public view returns (string memory) {
        // iterate over Candidates array and find matching one
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                return candidates[i].name;
            }
        }
        return "Not found";
    }

    function getCandidateVoteCount(address _candidateAddress) public view returns (uint256) {
        // iterate over Candidates array and find matching one
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                return candidates[i].voteCount;
            }
        }
        // TODO: Figure out what this should return if not found
    }

    function addVoter(address _voterAddress) public {
        require(!voters[_voterAddress].voted, "Voter already added.");
        voters[_voterAddress].voted = false;
        voterCount++;
    }

    function startVote() public {
        require(block.timestamp >= startTime, "Vote has not started yet.");
        require(!voteStarted, "Vote has already started.");
        require(candidates.length > 0, "There are no candidates added.");
        require(voterCount > 0, "There are no voters added.");

        voteStarted = true;
    }

    function endVote() public {
        require(voteStarted, "Vote has not started yet.");
        require(!voteEnded, "Vote has already ended.");
        //require(block.timestamp >= endTime, "Vote has not ended yet.");
        voteStarted = false;
        voteEnded = true;
    }

    function voteStartStatus() public  view returns (bool) {
        return voteStarted;
    }

    function voteEndStatus() public  view returns (bool) {
        return voteEnded;
    }

    function getVotes() public view returns (uint256[] memory) {
        uint256[] memory votes = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            votes[i] = candidates[i].voteCount;
        }
        return votes;
    }

    function vote(uint256 _candidateIndex) public {
        require(voteStarted, "Vote has not started yet.");
        require(!voteEnded, "Vote has already ended.");
        require(!voters[msg.sender].voted, "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        voters[msg.sender].voted = true;
        candidates[_candidateIndex].voteCount++;
    }

    function getVoters() public view returns (address[] memory) {
        address[] memory voterAddresses = new address[](voterCount);
        uint256 count = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (!voters[candidates[i].candidateAddress].voted) {
                voterAddresses[count] = candidates[i].candidateAddress;
                count++;
            }
        }
        return voterAddresses;
    }

    function tallyVotes() public view returns (uint256[] memory) {
        require(voteEnded, "Vote has not ended yet.");

        return getVotes();
    }
}