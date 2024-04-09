// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Poll {
    address electionManager;
    struct Candidate { /** fill in details */}
    struct Voter { /** fill in details */ }
    struct Proposal {/** fill in details */}

    Voter[] voters;
    Candidate[] candidates;
    Proposal[] proposals;

    bool privateVote;

    constructor() {
        electionManger = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == electionManager);
    _;
    }

    function addcandidate() public {
    }

    function addVoter() public {
    }

    function vote() public {
    }

    function deletePoll() public {
    }

    function startVote() public {
    }
    
    function endVote() public {
    }

    function getVotes() public {
    }

    function getVoters() public {
    }

    function tallyVotes() public {
    }

    // etc...
}