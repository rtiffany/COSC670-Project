import * as React from 'react';
import '../Login/Login.css';
import './Result.css';
import { ethers } from 'ethers';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js/auto';
ChartJs.register(ArcElement, Tooltip, Legend);

import abi from '../../contracts/Poll.json'
import contractAddress from '../../contracts/contractAddress.json';

export default function ResultPage() {
  const [provider, setProvider] = React.useState(null);
  const [pollData, setPollData] = React.useState({
      name: "",
      description: "",
      startTime: "",
      startDate: "",
      endTime: "",
      endDate: "",
      candidateNames: [],
      voteCounts: []
  });
  const canvasRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const pollAddress = contractAddress.Poll;
  const contractABI = abi.abi;

  const formatTime = (timestamp) => {
      const date = new Date(Number(timestamp) * 1000); // Convert BigInt to number and then multiply
      const hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digit format
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
      return `${hours}:${minutes}`;
  };

  const formatDate = (timestamp) => {
      const date = new Date(Number(timestamp) * 1000); // Convert BigInt to number and then multiply
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
  };

  React.useEffect(() => {
      if (typeof window !== "undefined") {
          if (window.ethereum) {
              setProvider(new ethers.BrowserProvider(window.ethereum));
          } else {
              console.error("Please install MetaMask!");
          }
      }
  }, []); // Empty dependency array to run once when the component mounts

  React.useEffect(() => {
      const fetchData = async () => {
          try {
              if (!provider || !pollAddress || !contractABI) {
                  console.error("Provider, poll address, or contract ABI not available.");
                  return;
              }
              const contract = new ethers.Contract(pollAddress, contractABI, provider);
              const [stTime, edTime, description, candidateNames, voteCounts] = await contract.getVotes("Test Poll");
              console.log("start time",Number(stTime));
              setPollData({
                  name: "Test Poll",
                  description,
                  startTime: formatTime(stTime),
                  startDate: formatDate(stTime),
                  endTime: formatTime(edTime),
                  endDate: formatDate(edTime),
                  candidateNames,
                  voteCounts
              });
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, [provider, pollAddress, contractABI]); // Run when these dependencies change

  React.useEffect(() => {
      if (!pollData || !pollData.candidateNames || !pollData.voteCounts || pollData.candidateNames.length === 0 || pollData.voteCounts.length === 0) {
          return;
      }

      const newChartData = {
          labels: pollData.candidateNames,
          datasets: [
              {
                  label: 'Vote Counts',
                  data: pollData.voteCounts.map(count => Number(count)),
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

      if (chartRef.current) {
          chartRef.current.destroy(); // Destroy existing chart
      }

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new ChartJs(ctx, {
          type: 'pie',
          data: newChartData,
          options: {}
      });

      return () => {
          if (chartRef.current) {
              chartRef.current.destroy();
          }
      };
  }, [pollData]);

    return (
        <div>
            <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center content'>
                <div className='login-form col-md-5' style={{ margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                    <form style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Name</label>
                                    <span>{pollData.name}</span>
                                </div>
                                <br />
                                {pollData.candidateNames.length > 0 && ( // Check if candidateNames array has data
                                  <div>
                                      <h2>Pie Chart Results</h2>
                                      <canvas ref={canvasRef} />
                                  </div>
                                  )}
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Poll Desc.</label>
                                    <span>{pollData.description}</span>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Time</label>
                                    <span>{pollData.startTime}</span>

                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>Start Date</label>
                                    <span>{pollData.startDate}</span>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Time</label>
                                    <span>{pollData.endTime}</span>
                                </div>
                                <br />
                                <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <label style={{ margin: '0', marginRight: '10px' }}>End Date</label>
                                    <span>{pollData.endDate}</span>
                                </div>
                            </div>
                            <br />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
