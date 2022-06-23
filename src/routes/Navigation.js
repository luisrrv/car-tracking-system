import React, { useState, useEffect } from 'react'
import Form from '../components/common/Form'
import Home from '../components/Home'
import City from '../components/manager/City'
import Car from '../components/manager/Car'
import Users from '../components/manager/Users'
import Report from '../components/manager/Report'
import Tracking from '../components/manager/Tracking'
import { app } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function Navigation() {
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleAction = (id) => {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
          if(error.code === 'auth/invalid-email'){
            toast.error('Please enter a valid Email');
          }
        })
    }

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email Already in Use');
        }
        if(error.code === 'auth/invalid-email'){
          toast.error('Please enter a valid Email');
        }
      })
   }
  }

  const navigate = useNavigate();

  return (
    <div>
      <ToastContainer />
        <Routes>
          <Route path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)} />}
          />
          <Route path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)} />}
          />
          <Route path='/'
            element={<Home />}
          />
          <Route path="/cities"
            element={
              <City />
            } />
          <Route path="/cars"
            element={
              <Car />
            } />
          <Route path="/users"
            element={
              <Users />
            } />
          <Route path="/report"
            element={
              <Report />
            } />
          <Route path="/tracking"
            element={
              <Tracking />
            } />
        </Routes>
    </div>
  )
}

export default Navigation
