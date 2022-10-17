import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebaseConfig';


const auth = getAuth(app)
const Login = () => {
    const[verifyEmail,setVerifEmail]= useState(false)
    const [userEmail,setUserEmail]=useState('')
const handleLogin = (e)=>{
  e.preventDefault();
  setVerifEmail(false)
  const form=e.target;
  const email = form.email.value;
  const password = form.password.value;
  console.log(email,password)
  signInWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user
    console.log(user)
    setVerifEmail(true)
    form.reset()
  })
  .catch(error=>{
    console.log(error);
  })
}
const handleUserResetEmail=(e)=>{
const email = e.target.value;
setUserEmail(email)
}
const handleVerifyEmailPassword=()=>{
    if(!userEmail){
        alert('please enter email address')
    }
    sendPasswordResetEmail(auth,userEmail)
    .then(()=>{
        alert('Reset password sent,,please check')
    })
    .catch(error=>{
        console.log(error);
    })
}

    return (
        <div className='container'>
            <form onSubmit={handleLogin}>
     <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onBlur={handleUserResetEmail} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  {verifyEmail && <p className='text-success'>login succesfully</p>}
  <p>Donot have any account <Link to='/register'>Register</Link></p>
  <p className='text-info'>Forgot your password<button type="button" onClick={handleVerifyEmailPassword} className="btn btn-link">Reset</button></p>
</form>
        </div>
    );
};

export default Login;