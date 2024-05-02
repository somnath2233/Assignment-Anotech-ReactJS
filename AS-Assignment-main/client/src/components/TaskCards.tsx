import { useState, useEffect } from "react";
import axiosInstance from "../api/api";
import TaskCard from "./TaskCard";
import { Grid, Paper, Typography } from "@mui/material";


interface Task {
    _id: string,
    task: string,
    desc: string,
    complete: boolean
}

function TaskCards() {
    const token: string = localStorage.getItem("id") || "";
    const [tasks, setTasks] = useState<Task[]>([]);
    const [pending,setPending]=useState<Task[]>([]);
    const [rerender, setRerender] = useState(false);

    useEffect(()=>{
        const pendTask=JSON.parse(localStorage.getItem("pending")||'[]');
        if(pendTask.length!==0){
            setPending([...pendTask]);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("pending", JSON.stringify(pending));
        const data = new URLSearchParams({
            id: token
        });
        axiosInstance.post("api/task/", data)
            .then(res => {
                //console.log(res);
                const task: Array<Task> = res.data.userTask
                if (task == undefined) {
                    setTasks([]);
                    return;
                }
                setTasks([...task]);
            })
            .catch(err => { console.log(err) })
    }, [rerender, token, pending])

    function handleComplete(id:string) {
        const task_id: string = id;
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

    function handleTodo(e: React.DragEvent<HTMLDivElement>){
        const id=e.dataTransfer.getData('id');
        console.log("dropped in todo");
        if(pending.find(task=>task._id===id)){
            const newPending=pending.filter(task=>task._id!==id);
            console.log(newPending);
            setPending([...newPending]);
        }
        else {
            handleComplete(id);
        }
    }

    function handleNotPending(e: React.DragEvent<HTMLDivElement>){
        const id=e.dataTransfer.getData('id');
        //if(pending.find(task=>task._id===id))
        handleComplete(id);
        const newPending=pending.filter(task=>task._id!==id);
        console.log(newPending);
        setPending([...newPending]);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>){
        const id=e.dataTransfer.getData("id");
        console.log("Item dropped");
        const dropTask=tasks.find(task=>task._id===id);
        const newTask:Task[]=tasks.filter(task=>task._id!==id);
        if( dropTask===undefined) return;
        if(dropTask.complete===true){
            dropTask.complete=false;
            handleComplete(id);
        }
        setPending((prev:Task[])=>[dropTask,...prev]);
        setTasks([...newTask]);
        console.log(pending);
    }
    function handleHover(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
        console.log("Item hovering")
    }

        return (
            <>
            <Grid container columnGap={10} spacing={2} sx={{margin:"20px 0px", display:"flex" , justifyItems:"center", justifyContent:"center" }} >
            <Grid item sm={12} md={3} lg={3}>
            <Paper sx={{height:"80vh", width:"auto" , overflow:"auto", padding:"10px 20px"}} elevation={10} onDragOver={handleHover} onDrop={handleTodo}>
                <Typography variant="h5" component="div" style={{ textAlign: "center", padding:"10px"}}>
                    To-Do
                </Typography>
                <Grid container spacing={2} marginTop={1} sx={{display:"flex", justifyItems:'center', justifyContent:'center'}}>
                {tasks.map(task => {
                    if(task.complete===false){
                        if(pending.find(_=>_._id===task._id)) return;
                        return (
                            <TaskCard task={task} token={token} setRerender={setRerender} key={task._id}/>
                        )
                    }
                })}
                </Grid>

            </Paper>
            </Grid>
            <Grid item sm={12} md={3} lg={3}>
            <Paper sx={{height:"80vh", width:"auto" , overflow:"auto", padding:"10px 20px"}} elevation={10} onDrop={handleDrop} onDragOver={handleHover}>
                <Typography variant="h5" component="div" style={{ textAlign: "center", padding:"10px" }}>
                    Doing
                </Typography>
                <Grid container spacing={2} marginTop={1} sx={{display:"flex", justifyItems:'center', justifyContent:'center'}}>
                {pending.map(task => {
                        const check=tasks.find(t=>t._id===task._id);
                        if(check?.complete) return
                        return (
                            <TaskCard task={task} token={token} setRerender={setRerender} key={task._id} pending={pending} setPending={setPending}/>
                        )
                })}
                </Grid>
            </Paper>
            </Grid>
            <Grid item sm={12} md={3} lg={3}>
            <Paper sx={{height:"80vh", width:"auto" , overflow:"auto", padding:"10px 20px"}} elevation={10} onDragOver={handleHover} onDrop={handleNotPending} >
                <Typography variant="h5" component="div" style={{ textAlign: "center", padding:"10px" }}>
                    Done
                </Typography>
                <Grid container spacing={2} marginTop={1} sx={{display:"flex", justifyItems:'center', justifyContent:'center'}}>
                {tasks.map(task => {
                    if(task.complete===true)
                        return (
                            <TaskCard task={task} token={token} setRerender={setRerender} key={task._id}/>
                        )
                })}
                </Grid>

            </Paper>
            </Grid>
            </Grid>
            </>
        )
}

export default TaskCards;