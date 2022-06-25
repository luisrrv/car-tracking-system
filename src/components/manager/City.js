import React, { useState, useEffect } from 'react'
import ManagerNav from './ManagerNav'
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'

function City() {

  const [newName, setNewName] = useState("")
  const [cities, setCities] = useState([]);
  const citiesCollectionRef = collection(db, "cities");

  const createCity = async () => {
      await addDoc(citiesCollectionRef, {name: newName})
      const data = await getDocs(citiesCollectionRef);
      setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const updateCity = async (id, name) => {
    const cityDoc = doc(db, "cities", id);
    const newFields = {name: name};
    await updateDoc(cityDoc, newFields);
    const data = await getDocs(citiesCollectionRef);
    setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const deleteCity = async (id) => {
    const cityDoc = doc(db, "cities", id);
    await deleteDoc(cityDoc);
    const data = await getDocs(citiesCollectionRef);
    setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));

  }

  useEffect(() => {
    const getCities = async () => {
      const data = await getDocs(citiesCollectionRef);
      setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getCities()
  });

  const newForm = document.querySelector(".new-user-form")

  return (
    <div>
      <ManagerNav />
      <h1>CITIES</h1>
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
            label="City name"
            variant="outlined"
            onChange={(e) => setNewName(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={createCity}>Add</Button>
        <Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
      </div>

        <div className='cards'>
      {cities.map((city) => {
        return (
          <div>
            <div className='card'>
            <div className={`edit${city.id}`} style={{display: 'none'}}>
              <h3>Edit city info</h3>
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
                  label="City name"
                  variant="outlined"
                  placeholder={city.name}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Box>
              <div className="edit--btns">
                <Button variant="contained" onClick={() => {updateCity(city.id, newName); document.querySelector(`.edit${city.id}`).style.display = "none";  document.querySelector(`.user--info${city.id}`).style.display = "block"}}>Add</Button>
                <Button onClick={() => {document.querySelector(`.edit${city.id}`).style.display = "none";  document.querySelector(`.user--info${city.id}`).style.display = "block"}}><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
              </div>
            </div>
              <div className={`user--info${city.id}`}>
                <h3>{city.name ? city.name : "no name :("} </h3>
                <p>Cars: {city.car ? city.car : "Not assigned :("}</p>
                <span><Button onClick={() => {document.querySelector(`.edit${city.id}`).style.display = "block"; document.querySelector(`.user--info${city.id}`).style.display = "none"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><BiEdit /></Button></span><span><Button onClick={() => {deleteCity(city.id)}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><AiFillDelete /></Button></span>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default City
