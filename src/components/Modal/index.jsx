/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Autocomplete, Button, DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";

import {Facebook, Instagram, PhotoCamera, Twitter } from "@mui/icons-material";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const Input = styled("input")({
  display: "none",
});

const cityList = [
  "الرياض",
  "جدة",
  "الدمام",
  "الخرج",
  

];
function Modal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState({ type: "", messageText: "" });

  const handleData = (data) => {
    setData(data);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onFinish = async () => {
    try {
      console.log(data);
      setOpen(false);
  
    } catch (error) {
      if (error.response.status === 409) {
        setMessage({
          type: "error",
          messageText: "تم الاشتراك مسبقاً من قبل هذا الهاتف",
        });
      } else {
        const errorMessage = error.response.data.message;
        setMessage({ type: "error", messageText: errorMessage });
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="createprofile"onClick={handleClickOpen} >
      إنشاء ملفك الشخصي
      </button>
      <Dialog open={open} onClose={handleClose}>
        <form className="form__container">
          <DialogContent>
          <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                type="file"
                id="icon-button-file"
                name="logo"
                onChange={async (event) => {
                  const imageBase = await convertToBase64(
                    event.currentTarget.files[0]
                  );
                  handleData({ ...data, image: imageBase });

                }}
              />
              <Button
                variant="outlined"
                component="span"
                sx={{
                  height: "56px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
             marginTop: "1rem" }}

              >
                <PhotoCamera sx={{ mr: 1, color: "#00A560" }} />
                ارفع صورة شخصية لك               </Button>

              {data.image && "تم اضافة الصورة بنجاح"}
            </label>
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              name="description"
              id="description"
              multiline
              rows={2}
              label="أدخل وصف قصير عن نفسك"
              variant="outlined"
              onChange={(e) => handleData({ ...data, description: e.target.value })}
            />
              <Autocomplete
              disablePortal
              options={cityList}
              sx={{   width: "100%", marginTop: "1rem" }}
              renderInput={(params) => (
                <TextField {...params} label="الموقع" />
              )}
              onChange={(e, newValue) => handleData({ ...data, city: newValue })}
             
            />
            <p className="titlesocail">مواقع تواصل اجتماعي</p>
            <p className="contentsocail">اضافتك لمواقع التواصل الاجتماعي يزيد من فرصة تعرف الناس عليك</p>
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              name="facebook"
              id="facebook"
              label={
                
                  <Facebook />
                
              }
                      variant="outlined"
              onChange={(e) => handleData({ ...data, facebook: e.target.value })}
            /> 
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              name="instagram"
              id="instagram"
              label={<Instagram />}
              variant="outlined"
              onChange={(e) => handleData({ ...data, instagram: e.target.value })}
            />
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              name="twitter"
              id="twitter"
              label={<Twitter />}
              variant="outlined"
              onChange={(e) => handleData({ ...data, twitter: e.target.value })}
            />


          </DialogContent>
          <DialogActions sx={{ mb: 2 }}>
            <button onClick={onFinish} className="modalbtn">
أتمم التعديل            </button>

          </DialogActions>
         
        </form>
      </Dialog>

    </div>
  );
}

export default Modal;
