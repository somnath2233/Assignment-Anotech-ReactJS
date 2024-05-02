import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../api/api";

interface prop{
    setForm:React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskForm(props:prop){
    const btnStyle={margin:'10px 0px 15px 0px'};
    const inputStyle={margin:'20px 0px'};
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' }

    const [title, setTitle]=useState("");
    const [desc, setDesc]=useState("");
    const [dis, setDis]=useState(false);
    const [error,setError]=useState(false);
    const id: string = localStorage.getItem("id") || "";

    function handleSubmit(){
        if(title.length==0||desc.length==0){
            setError(true);
            return;
        }
        setDis(true);
        const data = new URLSearchParams({
            id: id,
            task:title,
            desc:desc
        })
        axiosInstance.post("api/task/new",data)
        .then(res=>{
            console.log(res);
            props.setForm(false);
        })
        .catch((err)=>{console.log(err);})
        setDis(false);
    }
    return(
        <Grid sx={{margin:"50px auto"}}>
            <Paper elevation={-1} style={paperStyle}>
                <Grid container alignItems="center" justifyContent="center">
                    <Typography variant="h5" noWrap component="div" style={{margin:"10px auto 80px auto"}}>Create Task</Typography>
                    <TextField
                        value={title} type="text" variant="outlined" label={error?"Required":"Title"} style={inputStyle}
                        onChange={(e)=>{setTitle(e.target.value)}} fullWidth error={error} autoComplete="false"
                    />
                    <TextField 
                        value={desc} type="text" variant="outlined" label={error?"Required":"Description"} style={inputStyle}
                        onChange={(e)=>{setDesc(e.target.value)}} fullWidth multiline rows={5} error={error} autoComplete="false"
                    />
                    <Button variant="outlined" fullWidth style={btnStyle} disabled={dis} onClick={handleSubmit}>Create</Button>
                </Grid>
            </Paper>
        </Grid>
    );
}


export default TaskForm;