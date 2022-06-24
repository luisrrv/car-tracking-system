import React, { useState, useEffect } from 'react'
import ManagerNav from './ManagerNav'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { async } from '@firebase/util';

function Users() {
  let navigate = useNavigate();

  const [newName, setNewName] = useState("")
  const [newCar, setNewCar] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  let [isEdit, setIsEdit] = useState({
    item: {},
    edit: false
  })

  const editMode = async (user) => {
    console.log(user)
    isEdit = ({
      item: user,
      edit: true
    })
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    console.log(isEdit)
  }

  const createUser = async () => {
    if(isEdit.edit === true) {
    } else {
      await addDoc(usersCollectionRef, {name: newName, car: newCar, type: "Operator"})
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }
  };

  const updateUser = async (id, name, car) => {
    const userDoc = doc(db, "users", id);
    const newFields = {name: name, car: car};
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
  }, [])

  useEffect(() => {
    if (isEdit.edit === true) {
      setNewName(isEdit.user.name)
      setNewCar(isEdit.user.car)
    }
  }, [isEdit])

  const newForm = document.querySelector(".new-user-form")
  const changeX = () => {
    return (
      newForm.classList.contains("hide") ? <AiOutlinePlus /> : "X"
    )
  }

  return (
    <div>
      <ManagerNav />
      <h1>USERS</h1>
      <h2>OPERATORS<span><Button onClick={() => {newForm.classList.toggle("hide")}} className='form--title'>{changeX}</Button></span></h2>
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
            id="car"
            label="Assigned car"
            variant="outlined"
            onChange={(e) => setNewCar(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={createUser}>Add</Button>
      </div>

        <div className='cards'>
      {users.map((user) => {
        console.log(user);
        return (
          <div>
            <div className={`edit${user.id}`} style={{display: 'none'}}>
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
                  id="car"
                  label="Assigned car"
                  variant="outlined"
                  placeholder={user.car}
                  onChange={(e) => setNewCar(e.target.value)}
                />
              </Box>
              <div className="edit--btns">
                <Button variant="contained" onClick={() => {updateUser(user.id, newName, newCar); document.querySelector(`.edit${user.id}`).style.display = "none"}}>Add</Button>
                <Button onClick={() => {document.querySelector(`.edit${user.id}`).style.display = "none"}}>x</Button>
              </div>
            </div>
            <div className='card'>
              <h3>{user.name ? user.name : "no name :("} </h3>
              <p>Car: {user.car ? user.car : "Not assigned :("}</p>
              <span><Button onClick={() => {document.querySelector(`.edit${user.id}`).style.display = "block"}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><BiEdit /></Button></span><span><Button onClick={() => {deleteUser(user.id)}} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}><AiFillDelete /></Button></span>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Users
