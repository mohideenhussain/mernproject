import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import ChairIcon from '@mui/icons-material/Chair';
import SeatDialog from '../../layout/dialog/SeatDialog';
import { useFormContext, useFieldArray } from 'react-hook-form';

const SeatHeader = styled('div', {
    shouldForwardProp: (prop) => prop !== 'seat'
})(({ seat }) => ({
    border: '1px solid #999',
    textAlign: 'center',
    color: '#999',
    borderRadius: '10px',
    padding: '10px',
    marginTop: 0,
    ...((seat === 1 || seat === 5) && {
        marginTop: '-25px'
    })
}))

const Semisleeper = () => {

    const { control } = useFormContext();
    const { fields } = useFieldArray({
      control,
      name: 'seats'
    })
   
    const [selectedValue, setSelectedValue] = useState({ open: false, item: null });
    const openDialog = (index) => {
        setSelectedValue({
            ...selectedValue,
            open: true,
            item: index
        })
    }
    return (
        <Box>
            {
                Array.from({ length: 1 }).map((_, index_table) => (
                    <Container sx={{ display: 'flex' }} key={index_table}>
                        <Table key={index_table}>
                            <TableHead></TableHead>
                            <TableBody>
                                {
                                    Array.from({ length: 6 }).map((_, index_row) => (
                                        <TableRow key={index_row}>
                                            {
                                                Array.from({ length: 10 }).map((_, index_col) => (
                                                    (fields || []).map((item, index) => {
                                                        return (
                                                            (item.row === index_row) && (item.z_index === index_table) && (item.coloumn === index_col) && (<TableCell sx={{ borderBottom: 0 }} key={item.seat_id}>
                                                                <SeatHeader seat={index_row} key={item.id} onClick={() => openDialog(index)}>
                                                                    <div key={item.id} ><ChairIcon></ChairIcon></div>
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

export default Semisleeper;