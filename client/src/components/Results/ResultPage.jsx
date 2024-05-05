import * as React from 'react';
import '../Login/Login.css';
import './Result.css';
import { ethers } from 'ethers';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js/auto';
ChartJs.register(ArcElement, Tooltip, Legend);

//import abi from '../../contracts/Poll.json'
//import contractAddress from '../../contracts/contractAddress.json';

export default function ResultPage() {

     const [provider, setProvider] = React.useState(null);
     const [ChartData, setChartData] = React.useState(null);
     
     
    // const [pollName, setPollName] = React.useState("");
    // const pollAddress = contractAddress.Poll;
    // const contractABI = abi.abi;

    // const createPoll = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         const signer = await provider.getSigner();
    //         const contract = new ethers.Contract(pollAddress, contractABI, signer);
    //         await contract.setName("TEST POLL");
    //         setPollName(await contract.getName());
    //         window.alert(`${pollName} successfully created!`);
    //         // window.location.replace('configurePoll/pollDash');
    //     } catch (error) {
    //         window.alert(error);
    //     }
    // }

    const generateChartData = () => {
        // Sample data for the pie chart
        return {
          labels: ['Candid 1', 'Candid 2', 'Candid 3', 'Candid 4', 'Candid 5', 'Candid 6'],
          datasets: [
            {
              label: 'Sample Dataset',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
              ],
              hoverOffset: 4,
            },
          ],
        };
      };
  
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

    //   if (!ChartData) {
    //     return null; // Render loading state until chart data is ready
    // }

   const options = {};
    return (
        <div>
            <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center content'>
                <div className='login-form col-md-5' style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <form style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Name</label>
                                </div>
                                <br />
                                <div>
                                    <h2>Pie Chart Results</h2>
                                    <Pie data={generateChartData()} options={options} />
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Desc.</label>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Time</label>

                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Date</label>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Time</label>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Date</label>
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
