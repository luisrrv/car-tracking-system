import React, { useState, useEffect } from 'react'
import ManagerNav from './ManagerNav'
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'

function City() {

  const [newName, setNewName] = useState("")
  const [newCar, setNewCar] = useState("")
  const [newOperator, setNewOperator] = useState("")
  const [cities, setCities] = useState([]);
  const [cars, setCars] = useState([]);
  const [operators, setOperators] = useState([]);
  const citiesCollectionRef = collection(db, "cities");
  const carsCollectionRef = collection(db, "cars");
  const operatorsCollectionRef = collection(db, "operators");
  const [newEditingCity, setNewEditingCity] = useState({})


  const createCity = async () => {
      await addDoc(citiesCollectionRef, {name: newName, car: newCar, operator: newOperator})
      const data = await getDocs(citiesCollectionRef);
      setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const updateCity = async (id, name, car, operator) => {
    const cityDoc = doc(db, "cities", id);
    const newFields = {name: name};
    await updateDoc(cityDoc, newFields);
    const data = await getDocs(citiesCollectionRef);
    setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

  const assignToCity = async (id, car, operator) => {
    const cityDoc = doc(db, "cities", id);
    const newFields = {car: car.id, operator: operator.id};
    await updateDoc(cityDoc, newFields);
    const data = await getDocs(citiesCollectionRef);
    setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  }

  const deleteCity = async (id) => {
    const cityDoc = doc(db, "cities", id);
    await deleteDoc(cityDoc);
    const data = await getDocs(citiesCollectionRef);
    setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));

  }

  const addToCity= (id) => {
    cities.map((city) => {
      return(
        city.id === id && setNewEditingCity(city)
        )
    })
  }

  useEffect(() => {
    const getCities = async () => {
      const data = await getDocs(citiesCollectionRef);
      setCities(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getCities()
  }, []);

  useEffect(() => {
    const getCars = async () => {
      const data = await getDocs(carsCollectionRef);
      setCars(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getCars()
  }, []);

  useEffect(() => {
    const getOperators = async () => {
      const data = await getDocs(operatorsCollectionRef);
      setOperators(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getOperators()
  }, []);

  const allCars = cars.map((car) => {
      return (
        <MenuItem value={car}>{car.name}</MenuItem>
      )
    })
  const allOperators = operators.map((operator) => {
      return (
        <MenuItem value={operator}>{operator.name}</MenuItem>
      )
    })

  const papas = (e) => {
    setNewCar(e.target.value)
  }
  const papas2 = (e) => {
    setNewOperator(e.target.value)
  }

  const newForm = document.querySelector(".new-user-form")
  const addForm = document.querySelector(".addtocity")

  return (
    <div>
      <ManagerNav />
      {/* <h1>CITIES</h1> */}
      <h1 className='users--subtitle'>CITIES<span><Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'><AiOutlinePlus style={{fontSize: "20px"}} /></Button></span></h1>
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
      <div className="addtocity">
        <h3>{newEditingCity.name}</h3>
              <Box className="add-to-city-form"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField
                  size='small'
                  id="name"
                  label="City name"
                  variant="outlined"
                  // placeholder={city.name}
                  onChange={(e) => setNewName(e.target.value)}
                /> */}
                <InputLabel id="demo-simple-select-label">Car</InputLabel>
                <Select
                  labelId="car"
                  id="car"
                  value={newCar}
                  // label="Car"
                  onChange={(e) => papas(e)}
                >
                {allCars}
                </Select>
                <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                <Select
                  labelId="operator"
                  id="operator"
                  value={newOperator}
                  // label="Operator"
                  onChange={(e) => papas2(e)}
                >
                {allOperators}
                </Select>
                {/* <TextField
                  size='small'
                  id="car"
                  label="Assigned car"
                  variant="outlined"
                  // placeholder={city.car}
                  onChange={(e) => setNewName(e.target.value)}
                /> */}
                {/* <TextField
                  size='small'
                  id="operator"
                  label="Assigned operator"
                  variant="outlined"
                  // placeholder={city.operator}
                  onChange={(e) => setNewName(e.target.value)}
                /> */}
                <Button onClick={() => {assignToCity(newEditingCity.id, newCar, newOperator)}} variant="contained">Add</Button>
              </Box>
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
                {/* <TextField
                  size='small'
                  id="car"
                  label="Assigned car"
                  variant="outlined"
                  placeholder={city.car}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  size='small'
                  id="operator"
                  label="Assigned operator"
                  variant="outlined"
                  placeholder={city.operator}
                  onChange={(e) => setNewName(e.target.value)}
                /> */}
              </Box>
              <div className="edit--btns">
                <Button variant="contained" onClick={() => {updateCity(city.id, newName); document.querySelector(`.edit${city.id}`).style.display = "none";  document.querySelector(`.user--info${city.id}`).style.display = "block"}}>Update</Button>
                <Button onClick={() => {document.querySelector(`.edit${city.id}`).style.display = "none";  document.querySelector(`.user--info${city.id}`).style.display = "block"}}><AiFillCloseCircle style={{fontSize: "20px"}} /></Button>
              </div>
            </div>
              <div className={`user--info${city.id}`}>
                <h3>{city.name ? city.name : "no name :("} </h3>
                <p>Cars: {city.car ? city.car : "Not assigned :("}</p>
                <p>Operator: {city.operator ? city.operator : "Not assigned :("}</p>
                <span>
                  <Button onClick={() => {document.querySelector(`.edit${city.id}`).style.display = "block"; document.querySelector(`.user--info${city.id}`).style.display = "none"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                    <BiEdit />
                  </Button>
                </span>
                <span>
                  <Button onClick={() => {deleteCity(city.id)}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                    <AiFillDelete />
                  </Button>
                </span>
                <span>
                  <Button onClick={() => {addToCity(city.id); addForm.style.display = "block"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                    +
                  </Button>
                </span>
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
