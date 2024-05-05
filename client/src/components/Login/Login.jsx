import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ConnectWallet from '../ConnectWallet/ConnectWallet';


export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Navigate to '/poll' upon form submission
        navigate('/voterLogin/vote');
    };


    return (
        <div>
            <div className='d-flex vh-100 bg-dark-grey justify-content-center align-items-center'>

                <div className='login-form col-md-5' style={{ margin: '0 100px' }}>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <h1 style={{ textAlign: "center" }}>Welcome to DVote System</h1>
                        </div>
                        <Link to="vote">
                        <button type="submit" className='btn btn-success w-100'>Submit</button>
                        </Link>
                        <Link to="/">
                            <button type="submit">Home</button>
                        </Link>
                    </form>
                </div>
            </div>

        </div>

    );
}
