import React, { useState, useEffect } from 'react'
import Form from '../components/common/Form'
import Home from '../components/Home'
import City from '../components/manager/City'
import Car from '../components/manager/Car'
import Users from '../components/manager/Users'
import Report from '../components/manager/Report'
import Tracking from '../components/manager/Tracking'
import OperatorNav from '../components/operator/OperatorNav'
import { app, db } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { collection, getDocs, doc } from 'firebase/firestore'
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
  const [operatorCode, setOperatorCode] = useState('')
  const [operators, setOperators] = useState([]);
  const usersCollectionRef = collection(db, "operators");

  const handleAction = (role) => {
    if (role === "manager") {
      const authentication = getAuth();

      createUserWithEmailAndPassword(authentication, email, password)

      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          console.log(response);
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
    else {
      const filteredOperator = operators.filter(operator => operator.code === operatorCode)
      // console.log(filteredOperator[0].code);
      if (filteredOperator.length === 0) {
        toast.error('Operator not found');
      }
      else if (filteredOperator[0].code === operatorCode) {
        navigate("/navigation")
      }

    }
  }

  useEffect(() => {
    const getOperators = async () => {
      const data = await getDocs(usersCollectionRef);
      setOperators(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getOperators()
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <ToastContainer />
        <Routes>
          <Route path='/Manager-login'
            element={
              <Form
                title="Manager login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction("manager")} />}
          />
          <Route path='/Operator-login'
            element={
              <Form
                title="Operator Login"
                setOperatorCode={setOperatorCode}
                handleAction={() => handleAction("operator")} />}
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
          <Route path="/navigation"
            element={
              <OperatorNav />
            } />
        </Routes>
    </div>
  )
}

export default Navigation
