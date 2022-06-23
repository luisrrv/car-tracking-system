import React, {useState, useEffect} from 'react'
import ManagerNav from './ManagerNav'
import {db} from '../../firebase-config'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Users() {
  const [newNumber, setNewNumber] = useState("")
  const [newCar, setNewCar] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {number: newNumber, car: newCar, type: "Operator"})
  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getUsers()
  }, [])

  return (
    <div>
      <ManagerNav />
      <h1>USERS</h1>
      <p className='form--title'>Add a new operator</p>
        <Box
          component="form"
          sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="number"
            label="Operator number"
            variant="outlined"
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <TextField
            id="car"
            label="Assigned car"
            variant="outlined"
            onChange={(e) => setNewCar(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={createUser}>Add</Button>
        <h2>OPERATORS</h2>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h3>{user.type} {user.number}</h3>
            <p>Car: {user.car ? user.car : "Not assigned"}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Users
