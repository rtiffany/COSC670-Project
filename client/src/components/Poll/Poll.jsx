import * as React from 'react';
import '../Login/Login.css';
import './Poll.css'
import LinkButton from '../LinkButton/LinkButton';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { ethers } from 'ethers';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';

export default function Poll() {

    const [options, setOptions] = React.useState(['Candidate 1', 'Candidate 2']);
    const [provider, setProvider] = React.useState(null);
    const [pollName, setPollName] = React.useState("");
    const pollAddress = contractAddress.Poll;
    // const hardhatPollAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const contractABI = abi.abi;

    const createPoll = async (event) => {
        event.preventDefault();
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(pollAddress, contractABI, signer);
            // const contract = new ethers.Contract(hardhatPollAddress, contractABI, signer);
            await contract.setName("TEST POLL");
            setPollName(await contract.getName());
            window.alert(`${pollName} successfully created!`);
            // window.location.replace('configurePoll/pollDash');
        } catch (error) {
            window.alert(error);
        }
    }

    React.useEffect(() => {
        if (typeof window !== "undefined") {
          if (window.ethereum) {
            setProvider(new ethers.BrowserProvider(window.ethereum));
            // getCurrentAd()
          } else {
            console.error("Please install MetaMask!");
          }
        }
      }, []);

    const addOption = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const newOptions = [...options, `Candidate ${options.length + 1}`];
        setOptions(newOptions);
    };

    const deleteOption = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (options.length > 2) { // Ensure there are at least two options before deleting
            const newOptions = options.slice(0, -1); // Remove the last option
            setOptions(newOptions);
        }
    };

    return (
        <div>
            <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center content'>
                <div className='login-form col-md-5' style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <form style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Your Poll Name'
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Desc.</label>
                                    <input
                                        type='text'
                                        placeholder='Poll Description'
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                                <br />
                                {/* Adding an option will rerender this code below with the incremented option */}
                                {options.map((option, index) => (
                                    <div key={index} className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>{option}</label>
                                        <input
                                            type='text'
                                            placeholder={`Enter ${option}`}
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                        />
                                        <InputWithLabel><strong>Candidate Address: </strong></InputWithLabel>
                                    </div>
                                ))}
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <button className='btn btn-primary m-4' onClick={addOption}
                                        style={{ margin: '1em' }}>Add more options</button>
                                    <button className='btn btn-danger' onClick={deleteOption}
                                        style={{ margin: '1em' }}>Delete last option</button>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Time</label>
                                    <input
                                        type='time'
                                        placeholder='Start Time'
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Date</label>
                                    <input
                                        type='date'
                                        placeholder=''
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Time</label>
                                    <input
                                        type='time'
                                        placeholder='End Time'
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Date</label>
                                    <input
                                        type='date'
                                        placeholder=''
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                            </div>
                            <br />
                            <div>
                                <button onClick={createPoll}>Create Poll</button>
                                <LinkButton to="/" text="Cancel" />
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className='livePoll'>
                    <h2>Live Polls</h2>
                    <div className='buttonContainer'>
                        <button type="submit" className='btn btn-success w-100'>Poll 1</button>
                        <button type="submit" className='btn btn-success w-100'>Poll 2</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
