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

function Car() {
  const [newName, setNewName] = useState("")
  const [newCar, setNewCar] = useState("")
  const [newCity, setNewCity] = useState("")
  const [cars, setCars] = useState([]);
  const [cities, setCities] = useState([]);
  const usersCollectionRef = collection(db, "cars");
  // const citiesCollectionRef = collection(db, "cities");


  const createCar = async () => {
      await addDoc(usersCollectionRef, {name: newName, city: newCity})
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const updateCar = async (id, name, city) => {
    const userDoc = doc(db, "cars", id);
    const newFields = {name: name, city: city};
    await updateDoc(userDoc, newFields);
    const data = await getDocs(usersCollectionRef);
    setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const deleteCar = async (id) => {
    const userDoc = doc(db, "cars", id);
    await deleteDoc(userDoc);
    const data = await getDocs(usersCollectionRef);
    setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));

  }

  useEffect(() => {
    const getCars = async () => {
      const data = await getDocs(usersCollectionRef);
      setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getCars()
  }, []);

  // useEffect(() => {
  //   const getCities = async () => {
  //     const data = await getDocs(citiesCollectionRef);
  //     setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  //   }

  //   getCities()
  // });

    // const allCities = cities.map((city) => {
    //   return (
    //     <MenuItem value={city.name}>{city.name}</MenuItem>
    //   )
    // })


  const newForm = document.querySelector(".new-user-form")

  return (
    <div>
      <ManagerNav />
      {/* <h1>USERS</h1> */}
      <h1 className='users--subtitle'>CARS<span><Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiOutlinePlus style={{fontSize: "20px"}} /></Button></span></h1>
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
            label="Car name"
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            id="city"
            label="Assigned city"
            variant="outlined"
            onChange={(e) => setNewCity(e.target.value)}
          />
          {/* <InputLabel
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
          </Select> */}
        </Box>
        <Button variant="contained" onClick={createCar}>Add</Button>
        <Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
      </div>

        <div className='cards'>
      {cars.map((car) => {
        return (
          <div >
            <div className='card'>
            <div className={`edit${car.id}`} style={{display: 'none'}}>
              <h3>Edit car info</h3>
              <Box key={car.id}
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
                  label="Car name"
                  variant="outlined"
                  placeholder={car.name}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  size='small'
                  id="city"
                  label="Assigned city"
                  variant="outlined"
                  placeholder={car.city}
                  onChange={(e) => setNewCar(e.target.value)}
                />
                {/* <TextField
                  size='small'
                  id="city_id"
                  label="Assigned city"
                  variant="outlined"
                  placeholder={car.city_id}
                  onChange={(e) => setNewCity(e.target.value)}
                /> */}
              </Box>
              <div className="edit--btns">
                <Button variant="contained" onClick={() => {updateCar(car.id, newName, newCar, newCity); document.querySelector(`.edit${car.id}`).style.display = "none";  document.querySelector(`.user--info${car.id}`).style.display = "block"}}>Update</Button>
                <Button onClick={() => {document.querySelector(`.edit${car.id}`).style.display = "none";  document.querySelector(`.user--info${car.id}`).style.display = "block"}}><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
              </div>
            </div>
              <div className={`user--info${car.id}`}>
                <h3>{car.name ? car.name : "no name :("} </h3>
                <p>City: {car.city ? car.city : "Not assigned :("}</p>
                {/* <p>City: {user.city_id ? user.city_id : "Not assigned :("}</p> */}
                <span><Button onClick={() => {document.querySelector(`.edit${car.id}`).style.display = "block"; document.querySelector(`.user--info${car.id}`).style.display = "none"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><BiEdit /></Button></span><span><Button onClick={() => {deleteCar(car.id)}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><AiFillDelete /></Button></span>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Car
