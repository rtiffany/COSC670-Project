import './Login.css';
import { Link } from 'react-router-dom';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';
import { ethers } from 'ethers';
import React from 'react';

export default function Login() {

    const [livePolls, setLivePolls] = React.useState([]);
    const [descriptions, setDescriptions] = React.useState();
    const [selectedPoll, setSelectedPoll] = React.useState();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
    };

    const handleRadioChange = (event) => {
        setSelectedPoll(event.target.value);
    };


    const getLivePolls = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress.Poll, abi.abi, signer);
        const result = await contract.getLivePolls();
        setLivePolls(result[0]);
        setDescriptions(result[1]);
    }

    React.useEffect(() => {
        getLivePolls();
    }, []);


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <h1 style={{ textAlign: "center" }}>Active Polls</h1>
                </div>
                <h2>Choose a Poll:</h2>
                {
                    livePolls.map((pollName, index) => (
                        <>
                            <input type='radio' value={pollName} name='poll' key={index} onChange={handleRadioChange} />
                            <label><strong>{pollName}</strong>: {descriptions[index]}</label>
                            <br />
                        </>
                    ))
                }

                <Link to="vote" state={{fromHome: {selectedPoll}}}>
                <button disabled={!selectedPoll}>Submit</button>
                </Link>

                <Link to="/">
                    <button type="submit">Home</button>
                </Link>
            </form>
        </>

    );
}
