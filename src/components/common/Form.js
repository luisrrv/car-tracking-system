import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Btn from '@mui/material/Button';
import Button from './Button';
import { useNavigate } from "react-router-dom";

export default function BasicTextFields({title, setPassword, setEmail, handleAction}) {
  const navigate = useNavigate();
  console.log(title)
    return (
        <div>
            <div className="heading-container">
                <h3>
                    {title}
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Button title={title} handleAction={handleAction}/>
            <Btn onClick={() => {navigate(`/${title === "Register" ? "login" : "register"}`)}}>{title === "Register" ? "Login" : "Register"}</Btn>
        </div>
    );
}
