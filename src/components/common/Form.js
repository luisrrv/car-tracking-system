import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Btn from '@mui/material/Button';
import Button from './Button';
import { useNavigate } from "react-router-dom";

export default function BasicTextFields({title, setPassword, setEmail, setOperatorCode, handleAction}) {
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
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
              {title === "Manager login" ?
              <div className='manager-login-form'>
              <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
            :
            <TextField
                  id="code"
                  label="Login code"
                  variant="outlined"
                  onChange={(e) => setOperatorCode(e.target.value)}
                />

            }

            </Box>

            {title === "Manager login" ?
            <Button title={title} handleAction={handleAction}/>
            :
            <Button title={title} handleAction={handleAction}/>
            }
          <Btn onClick={() => {navigate(`/${title === "Operator Login" ? "Manager-login" : "Operator-login"}`)}}>{title === "Operator Login" ? "Manager Login" : "Operator Login"}</Btn>
        </div>
    );
}
