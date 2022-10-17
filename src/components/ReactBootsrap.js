import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebaseConfig';
import {Link} from 'react-router-dom'

const auth = getAuth(app)

const ReactBootsrap = () => {
  const [errorPassword,setErrorPassword]=useState('')
  const [sucess,setSucess]=useState(false)
    const handleEmailPassword = (e)=>{
        e.preventDefault();
        setSucess(false)
        const form = e.target;
        const name = form.name.value;
        const email =form.email.value;
        const password = form.password.value;
        console.log(name,email,password)

      if(!/(?=.*[A-Z])/.test(password)){
        setErrorPassword('Please Add at least one Upper Case!!')
        return;
      }
      if(!/(?=.*[!@#$%^&*])/.test(password)){
        setErrorPassword('Please put at least one specail character!!')
        return;
      }
      if(!/(?=.{8,})/.test(password)){
        setErrorPassword('password must be 8 character')
         return;
      }
      setErrorPassword('')

        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setSucess(true)
            form.reset()
            sendEmailVerification(auth.currentUser)
            .then(()=>{
              alert('Verification email has been sent to your email Address')
            })
            updateUserName(name)
        })
        .catch(error=>{
            console.log(error)
            setErrorPassword(error.message)
        })
    }
    const updateUserName=name=>{
      updateProfile(auth.currentUser,{
        displayName:name
      })
      .then(()=>{
        alert('User Name Updated')
      })
      .catch(error=>{
        console.log(error)
      })
    }
    return (
        <div className='container my-4'>
            <h1 className='text-primary'>Please Register!!!</h1>
            <Form onSubmit={handleEmailPassword}>
      <Form.Group  className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter your name"  required/>
       
      </Form.Group>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email"  required/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password"  required/>
      </Form.Group>
     <h2>{errorPassword}</h2>
     {sucess && <p className='text-succes'>User created succesfully</p>}

      <Button variant="primary" type="submit">
        Register
      </Button>
      <p>Already have an account <Link to='/login'>Login</Link></p>
    </Form>
        </div>
    );
};

export default ReactBootsrap;