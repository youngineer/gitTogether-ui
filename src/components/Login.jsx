import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState("test@gmail.com");
  const [password, setPassword] = useState("Test@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFormLogin, setIsFromLogin] = useState(false);
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
  };

  const handleSignUp = async() => {
    const signUpApUrl  = BASE_URL + "/signup";
    try {
      const signUpResponse = await axios.post(signUpApUrl, {firstName, lastName, emailId, password}, {
        withCredentials: true
      });
      dispatch(addUser(signUpResponse?.data?.data));
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='mt-10 flex justify-center'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isFormLogin? "Login": "SignUp Form"}</h2>
          {!isFormLogin && <><input type="text" placeholder="First Name" value={firstName} className="input m-3" onChange={(e) => setFirstName(e.target.value)}/>
          <input type="text" placeholder="Last Name" value={lastName} className="input m-3" onChange={(e) => setLastName(e.target.value)}/></>}
          <input type="text" placeholder="Email ID" value={emailId} className="input m-3" onChange={(e) => setEmailId(e.target.value)}/>
          <input type="text" placeholder="Password" value={password} className="input m-3" onChange={(e) => setPassword(e.target.value)}/>
          <div className="card-actions justify-center">
            <p className='cursor-pointer underline-offset-0' onClick={() => setIsFromLogin((value) => !value)}>{isFormLogin? "New User? SignUp": "Existing User? Login"}</p>
            <button className="btn btn-primary" onClick={() => {isFormLogin? handleLogin(): handleSignUp()}}>{isFormLogin? "Login": "SignUp"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login