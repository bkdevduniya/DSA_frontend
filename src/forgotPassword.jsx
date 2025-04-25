import './forgotPassword.css';
import axios from "./api/axios.js";
import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const checkEmail = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('api/passwordResetLink', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.exists) {
                setEmailExists(true);
            } else {
                setEmailExists(false);
                setError('Email does not exist');
            }
        } catch (error) {
            setEmailExists(false);
            setError('Error checking email');
            console.error('Error checking email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailCheck = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }
        checkEmail();
    };

    return (
        <>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Sending reset link...</p>
                </div>
            )}
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={handleEmailCheck}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Validate'}
                    </button>
                </form>
                {!emailExists && error && <p className="error">{error}</p>}
                {emailExists && <p className="success">Password reset link sent at <span style={{color: 'blue'}}>{email}</span></p>}
            </div>
        </>
    );
};

export default ForgotPassword;