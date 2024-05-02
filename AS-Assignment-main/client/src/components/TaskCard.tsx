import React from 'react';
import axiosInstance from "../api/api";
import { Button, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import { Check, Clear, Delete } from "@mui/icons-material";

interface Task{
    _id:string,
    task:string,
    desc:string,
    complete:boolean
}
interface Props{
    task:Task,
    token:string,
    setRerender:React.Dispatch<React.SetStateAction<boolean>>,
    pending?:Task[],
    setPending?:React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskCard = (props:Props) => {

    const task:Task=props.task;
    const setRerender=props.setRerender;
    const token:string=props.token;
    const parser = new DOMParser();
    const doc = parser.parseFromString(task.task, 'text/html');
    const doc1 = parser.parseFromString(task.desc, 'text/html');
    const title=doc.documentElement.textContent;
    const desc=doc1.documentElement.textContent;


    function handleComplete(e: React.MouseEvent<HTMLButtonElement>) {
        const task_id: string = e.currentTarget.id;
        const data = new URLSearchParams({
            task_id: task_id,
            id: token
        })
        axiosInstance.patch("api/task/update", data)
            .then(res => {
                console.log(res);
                setRerender((prev: boolean) => (!prev));
            })
            .catch(err => { console.log(err) })
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        const task_id: string = e.currentTarget.id;
        if(props.pending!==undefined&&props.setPending!==undefined){
            const newPending=props.pending.filter(task=>task._id!==task_id)
            props?.setPending([...newPending]);
        }
        const data = new URLSearchParams({
            id: token
        })
        axiosInstance.delete(`api/task/delete/${task_id}`, { data: data })
            .then(res => {
                console.log(res);
                setRerender((prev: boolean) => (!prev));
            })
            .catch(err => { console.log(err) })
    }
    function handleDrag(e: React.DragEvent<HTMLDivElement>){
        e.dataTransfer.setData("id",e.currentTarget.id);
        console.log("This Div is being dragged",e.currentTarget.id);
    }


    return (
        <Grid item sm={12} lg={12} id={task._id} draggable onDragStart={handleDrag}>
            <Paper key={task._id} style={{ width: "85%", height: "25vh", padding: "35px 10px", margin: "10px 5px", border:"1px solid black" }} elevation={0}>
                <Card sx={{ width: "100%", height: "20vh" }} elevation={0}>
                    <CardContent>
                        <Typography variant="h6" noWrap component="div" sx={task.complete ? { textDecoration: 'line-through' } : {}}>
                            {title}
                        </Typography>
                        <Typography sx={{overflowY:'auto', overflowX:"hidden" , margin: "10px 0px", maxHeight: '100px', width:"auto" }} component="div" variant='body2' color="text.secondary">
                            {desc}
                        </Typography>
                    </CardContent>
                </Card>
                <Stack direction="row" spacing={2} marginTop={2} >
                    <Button variant="outlined" id={task._id} onClick={handleDelete} color="error" startIcon={<Delete />}>
                        Delete
                    </Button>
                    <Button variant="outlined" color={task.complete ? "error" : "primary"} id={task._id} onClick={handleComplete} startIcon={task.complete ? <Clear /> : <Check />}>
                        {task.complete ? "Undo" : "Completed"}
                    </Button>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default TaskCard