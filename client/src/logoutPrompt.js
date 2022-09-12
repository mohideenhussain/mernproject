import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LogoutPrompt(props) {
  const {openDialog} = props;  
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose || setTimeout(()=>{
            setOpen(false)
        },5000)}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Session has been expired. Kindly login with your Credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
