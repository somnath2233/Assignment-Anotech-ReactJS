import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, InputAdornment, IconButton  } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import validator from "validator";
import { LockOpen, AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from "../api/api";

function LoginPage() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' }
    const iconStyle = { backgroundColor: "white", color: "#000", border: "2px solid black" }
    const inputStyle={margin:'20px 0px'};
    const btnStyle={margin:'10px 0px 15px 0px'};

    const [showPassword,setShowPassword]=useState(false);
    const [emailError,setEmailError]=useState(false);
    const [passError,setPassError]=useState(false);
    const [redirect,setRedirect]=useState(false);
    const [emailInput, setEmail]=useState("");
    const [passInput, setPass]=useState("");
    const [dis,setDis]=useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event:React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    const token = localStorage.getItem('id');
    if(token){
        const data=new URLSearchParams({
            id:token
        })
        axiosInstance.post("api/auth/token", data)
        .then(()=>{setRedirect(true)})
        .catch(err=>{console.log(err);})
    }

    const handleLogin=()=>{
        const email:string=emailInput;
        const pass:string=passInput;
        setEmailError(false);
        setPassError(false);
        setDis(true);
        if(email==undefined|| pass==undefined){
            setDis(false);
            return;
        }
        if(!validator.isEmail(email)){
            setEmailError(true);
            return;
        }
        const data= new URLSearchParams({
            'email':email,
            'password':pass
        });
        axiosInstance.post("api/auth/login",data)
        .then(res=>{
            const id=res.data.id;
            localStorage.setItem('id', id);
            setDis(false);
            setRedirect(true);
        })
        .catch((err)=>{
            console.log(err.response.status);
            const status=err.response.status;
            if(status===404){
                setEmailError(true);
                setPassError(true);
                setDis(false);
                return;
            }
            else if(status===401){
                setPassError(true);
                setDis(false);
                return;
            }
        });

        
    }

    return (
        <div>
            {redirect && <Navigate to="/" replace={true} />}
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Avatar style={iconStyle}><LockOpen /></Avatar><br />
                        <h2 style={{margin:"40px 10px 45px 10px"}}>Sign In</h2>
                        <TextField value={emailInput} label={emailError?"Incorrect Email":"Email"} variant="outlined" fullWidth required type="email" placeholder="example@gmail.com" style={inputStyle}
                        error={emailError}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField value={passInput} label={passError?"Wrong Password":"Password"} variant="outlined" fullWidth required placeholder="Password" style={inputStyle}
                        type={showPassword ? 'text' : 'password'}
                        error={passError}
                        onChange={(e)=>{setPass(e.target.value)}}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button variant="outlined" fullWidth style={btnStyle} onClick={handleLogin} disabled={dis}>Sign In</Button>
                        <Typography >
                            Do you Have an Account?  <Link to="/register">Sign Up</Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default LoginPage;