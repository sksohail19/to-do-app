import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("https://to-do-app-backend-ib5y.onrender.com/auth/login", {
                email,
                password
        });
            if (res.status === 200) {
                localStorage.setItem("authToken", res.data.authToken);
                alert("Login successful");
                navigate("/");  // Redirect to AddItem page after successful login
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="container w-50 mt-5">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-secondary ms-2" onClick={() => { setEmail(''); setPassword(''); }}>Reset</button>
            </form>
        </>
    )
}

export default Login
