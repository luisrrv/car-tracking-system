import React, { useState, useEffect } from 'react'
import ManagerNav from './ManagerNav'
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'

function Users() {

  const [newName, setNewName] = useState("")
  const [newCar, setNewCar] = useState("")
  const [newCity, setNewCity] = useState("")
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const citiesCollectionRef = collection(db, "cities");


  const createUser = async () => {
      await addDoc(usersCollectionRef, {name: newName, car_id: newCar, city_id: newCity, type: "Operator"})
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const updateUser = async (id, name, car_id, city_id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {name: name, car_id: car_id, city_id: city_id};
    await updateDoc(userDoc, newFields);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));

  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getUsers()
  });

  useEffect(() => {
    const getCities = async () => {
      const data = await getDocs(citiesCollectionRef);
      setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getCities()
  });

    const allCities = cities.map((city) => {
      return (
        <MenuItem value={city.name}>{city.name}</MenuItem>
      )
    })


  const newForm = document.querySelector(".new-user-form")

  return (
    <div>
      <ManagerNav />
      <h1>USERS</h1>
      <h2 className='users--subtitle'>OPERATORS<span><Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiOutlinePlus style={{fontSize: "20px"}} /></Button></span></h2>
      <div className="new-user-form hide">
        <Box
          component="form"
          sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Operator name"
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            id="car_id"
            label="Assigned car"
            variant="outlined"
            onChange={(e) => setNewCar(e.target.value)}
          />
          <InputLabel
            id="city_id"
          >Assigned city</InputLabel>
          <Select
            id="city_id"
            value=""
            label="Assigned city"
            variant="outlined"
            onChange={(e) => setNewCity(e.target.value)}
          >
            {allCities}
          </Select>
        </Box>
        <Button variant="contained" onClick={createUser}>Add</Button>
        <Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
      </div>

        <div className='cards'>
      {users.map((user) => {
        return (
          <div>
            <div className='card'>
            <div className={`edit${user.id}`} style={{display: 'none'}}>
              <h3>Edit user info</h3>
              <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  size='small'
                  id="name"
                  label="Operator name"
                  variant="outlined"
                  placeholder={user.name}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  size='small'
                  id="car_id"
                  label="Assigned car"
                  variant="outlined"
                  placeholder={user.car_id}
                  onChange={(e) => setNewCar(e.target.value)}
                />
                <TextField
                  size='small'
                  id="city_id"
                  label="Assigned city"
                  variant="outlined"
                  placeholder={user.city_id}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </Box>
              <div className="edit--btns">
                <Button variant="contained" onClick={() => {updateUser(user.id, newName, newCar, newCity); document.querySelector(`.edit${user.id}`).style.display = "none";  document.querySelector(`.user--info${user.id}`).style.display = "block"}}>Add</Button>
                <Button onClick={() => {document.querySelector(`.edit${user.id}`).style.display = "none";  document.querySelector(`.user--info${user.id}`).style.display = "block"}}><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
              </div>
            </div>
              <div className={`user--info${user.id}`}>
                <h3>{user.name ? user.name : "no name :("} </h3>
                <p>Car: {user.car_id ? user.car_id : "Not assigned :("}</p>
                <p>City: {user.city_id ? user.city_id : "Not assigned :("}</p>
                <span><Button onClick={() => {document.querySelector(`.edit${user.id}`).style.display = "block"; document.querySelector(`.user--info${user.id}`).style.display = "none"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><BiEdit /></Button></span><span><Button onClick={() => {deleteUser(user.id)}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><AiFillDelete /></Button></span>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Users
