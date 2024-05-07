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
    string[] public pollNames; 

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
    //require(_startTime > block.timestamp, "Start time must be in the future.");
    require(_endTime > _startTime, "End time must be after start time.");
   
    polls[_name].name = _name;
    polls[_name].description = _description;
    polls[_name].startTime = _startTime;
    polls[_name].endTime = _endTime;

    for (uint256 i = 0; i < _candidateNames.length; i++) {
        polls[_name].candidates.push(Candidate(_candidateNames[i], _candidateAddresses[i], 0));
    }
    pollNames.push(_name); // Add the new poll name to the array
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

    function vote(string memory _pollName, address _candidateAddress) public {
    require(pollExists(_pollName), "Poll does not exist.");
    
    // Check if voting has started
    require(block.timestamp >= polls[_pollName].startTime, "Voting has not started yet."); 
    // Check if voting has ended
    require(block.timestamp < polls[_pollName].endTime, "Voting has already ended.");

    require(!polls[_pollName].voters[msg.sender].voted, "You have already voted.");

    bool candidateFound = false;
    for (uint256 i = 0; i < polls[_pollName].candidates.length; i++) {
        if (polls[_pollName].candidates[i].candidateAddress == _candidateAddress) {
            candidateFound = true;
            polls[_pollName].voters[msg.sender].voted = true;
            polls[_pollName].candidates[i].voteCount++;
            break;
        }
    }
    
    require(candidateFound, "Candidate not found.");
}

   

   function tallyVotes(string memory _pollName) public view returns (uint256[] memory) {
    require(pollExists(_pollName), "Poll does not exist.");
    require(polls[_pollName].voteEnded, "Vote has not ended yet.");

    return getVotes(_pollName);
}

 function getPollDetails(string memory _pollName) public view returns (string memory, string memory, Candidate[] memory) {
        require(pollExists(_pollName), "Poll does not exist.");

        return (polls[_pollName].name, polls[_pollName].description, polls[_pollName].candidates);
    }


 function getLivePolls() public view returns (string[] memory, string[] memory, string[][] memory) {
    uint256 livePollCount = 0;

    // Determine the number of live polls
    for (uint256 i = 0; i < pollNames.length; i++) {
        if (polls[pollNames[i]].startTime <= block.timestamp && block.timestamp < polls[pollNames[i]].endTime) {
            livePollCount++;
        }
    }

    // Initialize arrays to store live poll details
    string[] memory livePollNames = new string[](livePollCount);
    string[] memory livePollDescriptions = new string[](livePollCount);
    string[][] memory livePollCandidates = new string[][](livePollCount);

    // Retrieve live poll details
    uint256 index = 0;
    for (uint256 i = 0; i < pollNames.length; i++) {
        if (polls[pollNames[i]].startTime <= block.timestamp && block.timestamp < polls[pollNames[i]].endTime) {
            // Store poll name and description
            livePollNames[index] = polls[pollNames[i]].name;
            livePollDescriptions[index] = polls[pollNames[i]].description;

            // Store candidate names
            string[] memory candidateNames = new string[](polls[pollNames[i]].candidates.length);
            for (uint256 j = 0; j < polls[pollNames[i]].candidates.length; j++) {
                candidateNames[j] = polls[pollNames[i]].candidates[j].name;
            }
            livePollCandidates[index] = candidateNames;
            index++;
        }
    }

    return (livePollNames, livePollDescriptions, livePollCandidates);
}




}