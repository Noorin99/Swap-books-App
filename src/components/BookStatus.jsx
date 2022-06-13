import React from 'react';
import { useState, useEffect } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BookStatus() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
        <button className="btn1" onClick={handleClickOpen}>
              أعط الكتاب <HelpOutlineIcon />{" "}
            </button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <div className="dialog-title">
              <DialogTitle>حدد حالة الكتاب</DialogTitle>
              <a href='#' className="book-status">دليل تحديد حالة الكتاب</a>
            </div>
           <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 450 }}>
              <InputLabel htmlFor="demo-dialog-native">حالة الكتاب</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>كالجديد</option>
                <option value={20}>ممتاز</option>
                <option value={30}>جيد جدا</option>
                <option value={40}>جيد</option>
                <option value={50}>قابل للاستخدام</option>
              </Select>
            </FormControl>
          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="give-book-btn">أعط الكتاب</Button>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookStatus;