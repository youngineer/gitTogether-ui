import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try{
      const loginResponse = await axios.post(`${BASE_URL}/login`,
      {emailId, password},
      {withCredentials: true}
    );

    dispatch(addUser(loginResponse.data.data));
    return navigate("/profile/feed");
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='mt-10 flex justify-center'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <input type="text" placeholder="Email ID" value={emailId} className="input m-3" onChange={(e) => setEmailId(e.target.value)}/>
          <input type="text" placeholder="Password" value={password} className="input m-3" onChange={(e) => setPassword(e.target.value)}/>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login