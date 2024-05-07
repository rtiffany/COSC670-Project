import * as React from 'react';
import '../Login/Login.css';
import './vote.css'
// import LinkButton from '../LinkButton/LinkButton';
// import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { AbstractProvider, ethers } from 'ethers';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';
import { act } from 'react';


export default function VotePage() {

    const [provider, setProvider] = React.useState();
    const [pollName, setPollName] = React.useState();
    const [pollDescription, setPollDescription] = React.useState();
    const [candidateState, setCandidateState] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const GetData = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress.Poll, abi.abi, signer);
        const [name, description, candidates] = await contract.getPollDetails('TestPoll3');
        setPollName(name);
        setPollDescription(description);
        setCandidateState(candidates);


        // console.log('Initial page render')
        // console.log(`Name: ${pollName}`);
        // console.log(`Description: ${pollDescription}`);
        // console.log(`Candidates: ${candidateState}`);
        // // activePolls = await contract.getLivePolls();
        // console.log("Currently Active Polls")
        // for (let i = 0; i < activePolls.length; i++) {
        // console.log(activePolls[i][1])
        // }
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
            <h2>Poll name: {pollName}</h2>
            <h3>Poll Description: {pollDescription}</h3>
            <h3>Candidates:</h3>
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
                        <br/>
                    </>
                ))
            }
            {console.log("Current selection:" + selectedValue)}
        </>
    )
}