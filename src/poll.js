import React, {useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import './Header.css';
import './livePoll.css'
import Header from './Header';



function Poll() {
    
        const [options, setOptions] = useState(['Option 1', 'Option 2']);
    
        const addOption = (e) => {
            e.preventDefault(); // Prevent default form submission behavior
            const newOptions = [...options, `Option ${options.length + 1}`];
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
                <Header />
                <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center content'>
                    <div className='login-form col-md-5' style={{margin: '20px 100px', display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
                        <form style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                                    <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>Poll Desc.</label>
                                        <input
                                            type='text'
                                            placeholder='Poll Description'
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>
                                    {options.map((option, index) => (
                                        <div key={index} className='mb-4' style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ margin: '0', marginRight: '10px' }}>{option}</label>
                                            <input
                                                type='text'
                                                placeholder={`Enter ${option}`}
                                                className='form-control'
                                                style={{ textAlign: 'center' }}
                                            />
                                        </div>
                                    ))}
                                    <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <button className='btn btn-primary m-4' onClick={addOption}>Add more options</button>
                                        <button className='btn btn-danger' onClick={deleteOption}>Delete last option</button>
                                    </div>
                                    <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>Start Time</label>
                                        <input
                                            type='time'
                                            placeholder='Start Time'
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>
                                    <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>Start Date</label>
                                        <input
                                            type='date'
                                            placeholder=''
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>
                                    <div className='mb-4' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <label style={{ margin: '0', marginRight: '10px' }}>End Time</label>
                                        <input
                                            type='time'
                                            placeholder='End Time'
                                            className='form-control'
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>
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
                                <button type="submit" className='btn btn-success w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className= 'livePoll'>
                                <h2>Live Polls</h2>
                                <div className='buttonContainer'>
                                    <button type="submit" className='btn btn-success w-100'>Poll 1</button>
                                    <button type="submit" className='btn btn-success w-100'>Poll 2</button>
                                </div>
                            </div>
                </div>
            </div>
        );
        
}

export default Poll