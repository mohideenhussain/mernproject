import React from "react";
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Sidebar = (props)=>{
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Drawer
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: props.drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        
        <DrawerHeader>
          <IconButton onClick={()=> props.handleDrawerClose()}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List sx={{ alignItems: 'center', color: '#888', p: 1 }}>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { navigate('/dashboard') }}>
            <DashboardIcon></DashboardIcon><ListItemText sx={{ p: 1 }} primary={'Dashboard'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { }}>
            <GroupAddIcon></GroupAddIcon><ListItemText sx={{ p: 1 }} primary={'Register'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { navigate('/addtrip') }}>
            <DirectionsBusIcon></DirectionsBusIcon><ListItemText sx={{ p: 1 }} primary={'Add Route'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { navigate('/schedule') }}>
            <ScheduleIcon></ScheduleIcon><ListItemText sx={{ p: 1 }} primary={'Schedule'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { }}>
            <InventoryIcon></InventoryIcon><ListItemText sx={{ p: 1 }} primary={'Orders'}></ListItemText>
          </ListItem>
        </List>
        <Divider />

        <List sx={{ alignItems: 'center', color: '#888', fontSize: '0.9rem', p: 1 }}>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { }}>
            <GroupAddIcon></GroupAddIcon><ListItemText sx={{ p: 1 }} primary={'Profile'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { }}>
            <PasswordIcon></PasswordIcon><ListItemText sx={{ p: 1 }} primary={'Change Password'}></ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex' }} button onClick={() => { }}>
            <LogoutIcon></LogoutIcon><ListItemText sx={{ p: 1 }} primary={'Logout'}></ListItemText>
          </ListItem>
        </List>
      </Drawer>
    )
}

export default Sidebar;