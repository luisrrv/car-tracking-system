import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { AppBar, ToolBar, IconButton, Typography, Stack } from '@mui/material';
// import Btn from '@mui/material/Button';
import { AiFillCar } from 'react-icons/ai'


function Navbar() {
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/Manager-login')
}

let navigate = useNavigate();
  return (
    <nav>
      <AppBar position='static'>
        {/* <ToolBar> */}
          <Typography variant='h6' component='div'><AiFillCar /> CTS MANAGER
            <Button color='inherit' onClick={handleLogout}>Log out </Button>
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={() => {navigate("/cities")}}>Cities</Button>
            <Button color='inherit' onClick={() => {navigate("/cars")}}>Cars</Button>
            <Button color='inherit' onClick={() => {navigate("/users")}}>Users</Button>
            <Button color='inherit' onClick={() => {navigate("/report")}}>Report</Button>
            <Button color='inherit' onClick={() => {navigate("/tracking")}}>Tracking</Button>
          </Stack>
        {/* </ToolBar> */}
      </AppBar>
    </nav>
  )
}

export default Navbar
