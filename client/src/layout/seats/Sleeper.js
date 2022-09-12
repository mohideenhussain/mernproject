import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import { Container } from '@mui/system';
import SeatDialog from '../../layout/dialog/SeatDialog';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


const SeatHeader = styled('div', {
    shouldForwardProp: (prop) => (prop !== 'seat' || prop !== 'indicate')
  })(({ seat, indicate }) => ({
    border: '1px solid #999',
    textAlign: 'center',
    color: '#999',
    borderRadius: '10px',
    padding: '10px',
    marginTop: 0,
    
    ...(seat === 1 && {
      marginTop: '-25px'
    }),
    ...(indicate.ladies_seat && {
      backgroundColor: '#FFC0CB'
    }),
    '& div':{
      position: 'relative',
      '& .MuiSvgIcon-root:nth-child(2)':{
        position: 'absolute',
        right: '-11px',
        top: '-11px',
        ...(indicate.z_index === 1 && {
          color: '#008000'
        }),
        ...(indicate.z_index === 0 && {
          color: '#FF0000'
        })
      }
    }
  })
    
  )


  
const Sleeper =()=>{

    const { register, control, formState: { errors } } = useFormContext();
    const { fields } = useFieldArray({
      control,
      name: 'seats'
    })
    const { dirtyFields } = useFormState({
      control
    });
    const [selectedValue, setSelectedValue] = useState({ open: false ,item: null});
    const openDialog = (index) => {
        setSelectedValue({
          ...selectedValue,
          open: true,
          item: index
        })
      }

    return( fields.length && <Box>
            {
              
              Array.from({ length: 2 }).map((_, index_table) => (
                <Container sx={{ display: 'flex' }} key={index_table}>
                  {
                    (fields.length && <div>{(index_table === 0) ? 'Lower Birth' : 'Upper Birth'}</div>)
                  }                  
                  <Table key={index_table}>
                      <TableHead></TableHead>
                      <TableBody>
                        {
                          Array.from({ length: 3 }).map((_, index_row) => (
                            <TableRow key={index_row}>
                              {
                                Array.from({ length: 5 }).map((_, index_col) => (
                                  (fields || []).map((item, index) => {
                                   return (
                                      (item.row === index_row) && (item.z_index === index_table) && (item.coloumn === index_col) && (<TableCell sx={{ borderBottom: 0 }} key={item.seat_id}>
                                        <SeatHeader seat={index_row} indicate= {item} key={item.id} onClick={() => openDialog(index)}>
                                          <div key={item.id} >
                                            <AirlineSeatFlatIcon></AirlineSeatFlatIcon>
                                          </div>
    
                                        </SeatHeader>
                                      </TableCell>)
                                      
                                      )
                                      
                                    })
                                ))
                              }
                            </TableRow>))
                        }
    
    
                      </TableBody>
    
                    </Table>
                   
                </Container>))
            }
            <SeatDialog            
              openDialog={selectedValue.open}
              item={selectedValue.item}
              closeDialog={() => setSelectedValue({ ...selectedValue, open: false })}
            />
          </Box>
          
          
    )
}

export default Sleeper;