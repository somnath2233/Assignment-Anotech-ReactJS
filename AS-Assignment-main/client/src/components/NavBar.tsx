import React, { MouseEventHandler, useState } from "react";
import { Box, AppBar, Typography, Toolbar, IconButton, Button, Stack, Hidden, Drawer, List, ListItem } from "@mui/material";
import { Task, Add, Logout, Menu as MenuIcon } from '@mui/icons-material';

interface prop {
    handleLogout: MouseEventHandler<HTMLButtonElement>,
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar(props: prop) {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" onClick={() => { props.setForm(false) }}>
                        <Task sx={{ margin: "0px 10px" }} />
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Tasks
                        </Typography>
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" startIcon={<Add />} onClick={() => { props.setForm(true) }} >
                                New Task
                            </Button>
                            <Button variant="outlined" color="error" endIcon={<Logout />} onClick={props.handleLogout}>
                                Logout
                            </Button>
                        </Stack>
                    </Box>
                    <Hidden mdUp>
                        <IconButton edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(!open)}>
                            <MenuIcon />
                            <Drawer anchor="right" open={open} onClose={() => { setOpen(!open) }} >
                                <List>
                                    <ListItem>
                                    <Button variant="contained" startIcon={<Add />} onClick={() => { props.setForm(true) }} >
                                        New Task
                                    </Button>
                                    </ListItem>
                                    <ListItem>
                                    <Button variant="outlined" color="error" endIcon={<Logout />} onClick={props.handleLogout}>
                                        Logout
                                    </Button>
                                    </ListItem>
                                </List>
                            </Drawer>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;