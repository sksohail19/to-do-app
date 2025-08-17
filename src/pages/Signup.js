import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            alert("Please fill all the fields")
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            /*const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });*/
            const response = await axios.post("http://localhost:5000/auth/signup", { username, email, password }, 
               {
                "Content-Type": "application/json"
            });

            if (response.status === 201) {
                localStorage.setItem('authToken', response.data.authToken);
                alert('Signup successful');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = async (e) => {
        setEmail("")
        setPassword("")
        setUsername("")
    }
  return (
    <>
      <h1 className="text-center">Signup</h1>
      <form className="container w-50" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="3">
            <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button type="submit " className="btn btn-primary m-3">Register</button>
        <button type="reset" className="btn btn-primary m-3">Reset</button>

        <p className="mt-3 cursor-pointer" onClick={() => navigate("/login")}><i>Already have a account? Login</i></p>
      </form>
    </>
  )
}

export default Signup
