import * as React from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../Login/Login.css';
import './vote.css'
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';


export default function VotePage() {
    
    const [provider, setProvider] = React.useState();
    const [pollName, setPollName] = React.useState();
    const [pollDescription, setPollDescription] = React.useState();
    const [candidateState, setCandidateState] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState();
    const navigate = useNavigate();

    // TODO: Try to receive data
    const  location = useLocation();
    const {fromHome} = location.state;
    let data = fromHome.selectedPoll;

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const GetData = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress.Poll, abi.abi, signer);
        const [name, description, candidates] = await contract.getPollDetails(data);
        setPollName(name);
        setPollDescription(description);
        setCandidateState(candidates);
    }

    const handleVote = async (event) => {
        /* Submit the current selectedValue and invoke the SC vote function.
        The smart contract takes the candidate name and address */
        event.preventDefault();

        let candidateName;
        let candidateAddress;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress.Poll, abi.abi, signer);

        for (let i = 0; i < candidateState.length; i++) {
            if (candidateState[i][0] === selectedValue) {
                candidateName = candidateState[i][0];
                candidateAddress = candidateState[i][1];
            }
        }

        window.alert("You are voting for " + candidateName + " with address " + candidateAddress);

        // TODO: Add error handling 
        await contract.vote(pollName, candidateAddress);

        navigate("Results", { state: { data } });

    }

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.ethereum) {
                setProvider(new ethers.BrowserProvider(window.ethereum));
            } else {
                console.error("Please install MetaMask!");
            }
        }
        GetData();
    }, []);

    return (
        <>
            <form>
                <h1>Poll name: {pollName}</h1>
                <h2>Poll Description: {pollDescription}</h2>
                <h2>Candidates:</h2>
                {
                    candidateState.map((candidate, index) => (
                        <>
                            <input
                                type='radio'
                                value={candidate[0]}
                                name='option'
                                key={index}
                                onChange={handleRadioChange}
                            />
                            <label>{candidate[0]}</label>
                            <br />
                        </>
                    ))
                }
                <button type='submit' onClick={handleVote} disabled={!selectedValue}>Vote</button>

                <Link id='linkButton' to="/voterLogin">
                    <button type='submit'>Back</button>
                </Link>
                <Link id='linkButton' to="/">
                    <button type='submit'>Home</button>
                </Link>
            </form>
        </>
    )
}