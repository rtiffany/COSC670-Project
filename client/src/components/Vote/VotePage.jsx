import * as React from 'react';
import '../Login/Login.css';
import './vote.css'
import LinkButton from '../LinkButton/LinkButton';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import { ethers } from 'ethers';
import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';

export default function VotePage() {

    const [provider, setProvider] = React.useState(null);


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

   

    return (
        <div>
            <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center content'>
                <div className='login-form col-md-5' style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <form style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <h2>Poll 1:</h2>
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                    <h3 style={{ margin: '0', marginRight: '10px' }}>Poll Name</h3>
                                    
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
                                <div>
                                     <LinkButton to="/Results" text="Submit" />
                                </div>
                            </div>
                            <br />
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
