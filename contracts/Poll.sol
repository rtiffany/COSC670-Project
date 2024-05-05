pragma solidity ^0.8.0;

//import "hardhat/console.sol";

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


    struct PollData {
        uint256 startTime;
        uint256 endTime;
        mapping(address => Voter) voters;
        uint256 voterCount;
        string name;
        string description;
        Candidate[] candidates;
        bool privateVote;
        bool voteStarted;
        bool voteEnded;
    }


    mapping(string => PollData) public polls;

    event PollCreated(string name);

    constructor() {
        electionManager = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == electionManager, "Only the election manager can perform this operation.");
        _;
    }

   function createPoll(
    string memory _name,
    string memory _description,
    string[] memory _candidateNames,
    address[] memory _candidateAddresses,
    uint256 _startTime,
    uint256 _endTime
) public {
    require(!pollExists(_name), "Poll with the same name already exists.");
    require(_startTime > block.timestamp, "Start time must be in the future.");
    require(_endTime > _startTime, "End time must be after start time.");
   
    polls[_name].name = _name;
    polls[_name].description = _description;
    polls[_name].startTime = _startTime;
    polls[_name].endTime = _endTime;


     // Toggle voteStarted if the current block timestamp is greater than or equal to the start time
    if (block.timestamp >= _startTime) {
        polls[_name].voteStarted = true;
    }

    // Toggle voteEnded if the current block timestamp is greater than or equal to the end time
    if (block.timestamp >= _endTime) {
        polls[_name].voteEnded = true;
    }

    for (uint256 i = 0; i < _candidateNames.length; i++) {
        polls[_name].candidates.push(Candidate(_candidateNames[i], _candidateAddresses[i], 0));
    }

    emit PollCreated(_name);
}


    function pollExists(string memory _name) public view returns (bool) {
        return bytes(polls[_name].name).length != 0;
    }


    function getVotes(string memory _pollName) public view returns (uint256[] memory) {
    require(pollExists(_pollName), "Poll does not exist.");

    uint256[] memory votes = new uint256[](polls[_pollName].candidates.length);
    for (uint256 i = 0; i < polls[_pollName].candidates.length; i++) {
        votes[i] = polls[_pollName].candidates[i].voteCount;
    }
    return votes;
}

    function vote(string memory _pollName, uint256 _candidateIndex) public {
    require(pollExists(_pollName), "Poll does not exist.");
    require(polls[_pollName].voteStarted, "Vote has not started yet.");
    require(!polls[_pollName].voteEnded, "Vote has already ended.");
    require(!polls[_pollName].voters[msg.sender].voted, "You have already voted.");
    require(_candidateIndex < polls[_pollName].candidates.length, "Invalid candidate index.");

    polls[_pollName].voters[msg.sender].voted = true;
    polls[_pollName].candidates[_candidateIndex].voteCount++;
   }
   

   function tallyVotes(string memory _pollName) public view returns (uint256[] memory) {
    require(pollExists(_pollName), "Poll does not exist.");
    require(polls[_pollName].voteEnded, "Vote has not ended yet.");

    return getVotes(_pollName);
}

}