import axios from "./api/axios.js";
import { useState, useEffect } from "react";
import "./resetPassword.css";   

const resetPassword=()=>{
const [email, setEmail] = useState("");
const [password1, setPassword1] = useState("");
const [password2, setPassword2] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState();

const handleSubmit = async (e) => {
    e.preventDefault();
    if(password1 !== password2){
        setError("Passwords do not match");
        setSuccess(false);
        return;
    }
    try {
        const response = await axios.post('/auth/changePassword', { email, password1 }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        setSuccess(true);
    }
    catch (err) {
        setSuccess(false);
        setError("Error resetting password");
        console.log(err);
    }
};

return (
    <>
    {!success && <div className="password-reset-error">{error}</div>}
   {success&&<div className="password-reset-success">
    Password reset successfully. 
    <a href="/login">Login</a>
    </div>}
    <div className="resetPassword">
        <form onSubmit={handleSubmit}>
            <div className="resetPassword__container">
                <h2>Reset Password</h2> 
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="new password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
                <input type="password" placeholder="confirm password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                <button type="submit">Reset Password</button>
            </div>
        </form>
    </div>
    </>
)
};

export default resetPassword;