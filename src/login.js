import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import './Header.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Navigate to '/poll' upon form submission
        navigate('/poll');
    };


    return (
      <div><Header />
        <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center'>
            
                    <div className='login-form col-md-5' style={{ margin: '0 100px' }}>
                    
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <h1 style = {{textAlign: "center"}}>Welcome to DVote System</h1>
                                <input
                                    type='text'
                                    placeholder='Enter Your Wallet Address'
                                    className='form-control' 
                                    style = {{textAlign: 'center'}}       
                                  
                                />
                            </div>
                            <button type="submit" className='btn btn-success w-100'>Submit</button>
                        </form>
                     
            </div>
        </div>
     </div>
   
    );
}

export default Login