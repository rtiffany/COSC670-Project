import * as React from 'react';
import '../Login/Login.css';
import './Poll.css'
import LinkButton from '../LinkButton/LinkButton';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { ethers } from 'ethers';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';

export default function Poll() {

    const [options, setOptions] = React.useState([
        { name: 'Candidate 1', value: '', candidateAddress:''},
        { name: 'Candidate 2', value: '', candidateAddress:''}
    ]);
    const [provider, setProvider] = React.useState(null);
    const [pollName, setPollName] = React.useState("");
    const [pollDesc, setPollDesc] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const { currentDate, currentTime } = getCurrentDateTime();
    const pollAddress = contractAddress.Poll;
    const contractABI = abi.abi;

    const createPoll = async (event) => {
        event.preventDefault();
        const optionNames = options.map(option => option.value);
        const optionAddresses = options.map(option => option.candidateAddress);
        // Check if the pollName is empty
        if (!pollName.trim()) {
            window.alert("Please enter a poll name.");
            return; // Prevent further execution of the function
        } else if (!pollDesc.trim()) {
            window.alert("Please enter a poll description.");
            return; // Prevent further execution of the function
        }
        for (const option of options) {
            if (!option.value.trim() || !option.candidateAddress.trim()) {
                //console.log(option);
                window.alert("Please fill in all candidate information.");
                return; // Prevent further execution of the function
            }
        }
        if (!startTime || !startDate || !endTime || !endDate){
            window.alert("Please fill in the Poll start and end time");
            return;
        } else if (startDate === currentDate && startTime < currentTime) {
            window.alert("Poll start time is passed");
            return;
        } else if ((endDate < startDate) || (startDate === endDate && endTime < startTime)) {
            window.alert("Poll end time is set before its start time");
            return;
        }

        

        try {
            window.alert("Creating poll. Please wait...");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(pollAddress, contractABI, signer);
            await contract.createPoll(pollName, pollDesc,
            optionNames, optionAddresses, startUnixTimestamp, endUnixTimestamp);

            window.alert("Poll creation response received waiting for verification.");

            const Poll = await contract.pollExists(pollName);
            
            
            if(Poll) {
            window.alert(`${pollName} successfully created!`);
            } else {
                window.alert(`${pollName} not created!`);
            };
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
        e.preventDefault();
        const newOption = { name: `Candidate ${options.length + 1}`, value: '' };
        setOptions([...options, newOption]);
    };

    const deleteOption = (e) => {
        e.preventDefault();
        if (options.length > 2) {
            const newOptions = options.slice(0, -1);
            setOptions(newOptions);
        }
    };

    const handleInputChange = (event, index, field) => {
        if (field === 'pollName') {
            setPollName(event.target.value);
        } else if (field === 'pollDesc') {
            setPollDesc(event.target.value);
        } else if (field === 'startTime') {
            setStartTime(event.target.value);
        } else if (field === 'startDate') {
            setStartDate(event.target.value);
        } else if (field === 'endTime') {
            setEndTime(event.target.value);
        } else if (field === 'endDate') {
            setEndDate(event.target.value);
        } else if (field === 'candidateAddress') {
            const { value } = event.target;
            setOptions(prevOptions => {
                const newOptions = [...prevOptions];
                newOptions[index].candidateAddress = value;
                return newOptions;
            });
        } else {
            const { value } = event.target;
            setOptions(prevOptions => {
                const newOptions = [...prevOptions];
                newOptions[index].value = value;
                return newOptions;
    });
        }
    }


    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return {
            currentDate: `${year}-${month}-${day}`,
            currentTime: `${hours}:${minutes}`
        };
    }

    // Function to convert date and time strings to Unix timestamp
function convertToUnixTimestamp(dateString, timeString) {
    // Combine date and time strings into a single string
    const dateTimeString = `${dateString} ${timeString}`;

    // Parse the date and time string into a JavaScript Date object
    const dateTime = new Date(dateTimeString);

    // Convert the Date object to Unix timestamp (seconds)
    const unixTimestamp = Math.floor(dateTime.getTime() / 1000);

    return unixTimestamp;
}

// Convert start date and time to Unix timestamp
const startUnixTimestamp = convertToUnixTimestamp(startDate, startTime);

// Convert end date and time to Unix timestamp
const endUnixTimestamp = convertToUnixTimestamp(endDate, endTime);

console.log(startUnixTimestamp);
console.log(endUnixTimestamp);

 

    console.log(options);
    console.log(pollName);

    return (
        <div>
            <div className='d-flex vh-100 justify-content-center align-items-center content'>
                <div className='login-form col-md-5' style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <form style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Your Poll Name'
                                        className='form-control'
                                        style={{ textAlign: 'center' }}
                                        value={pollName}
                                        onChange={(event) => handleInputChange(event, null, 'pollName')}
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
                                        value={pollDesc}
                                        onChange={(event) => handleInputChange(event, null, 'pollDesc')}
                                    />
                                </div>
                                <br />
                                {/* Adding an option will rerender this code below with the incremented option */}
                                {options.map((option, index) => (
                                    <div key={index} className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>{option.name}</label>
                                        <input
                                            type='text'
                                            placeholder={`Enter ${option.name}`}
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                            value={option.value}
                                            onChange={(e) => handleInputChange(e, index, 'name')}
                                        />
                                        <InputWithLabel
                                            id={`candidateAddress${index}`} // Unique id for each candidate address input
                                            value={option.candidateAddress}
                                            type='text'
                                            onInputChange={(e) => handleInputChange(e, index, 'candidateAddress')}
                                        >
                                            <strong>Candidate Address: </strong>
                                        </InputWithLabel>
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
                                        value={startTime}
                                        onChange={(e) => handleInputChange(e, null, 'startTime')}
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
                                        value={startDate}
                                        min={currentDate}
                                        onChange={(e) => handleInputChange(e, null, 'startDate')}
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
                                        value={endTime}
                                        onChange={(e) => handleInputChange(e, null, 'endTime')}
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
                                        value={endDate}
                                        min={currentDate}
                                        onChange={(e) => handleInputChange(e, null, 'endDate')}
                                    />
                                </div>
                            </div>
                            <br />
                            <div>
                                <button onClick={createPoll}>Create Poll</button>
                                <LinkButton to="/" text="Home" />
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
