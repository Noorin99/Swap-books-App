import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Autocomplete, Button, DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Facebook, Instagram, PhotoCamera, Twitter } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { storage, store } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const Input = styled("input")({ display: "none" });
const cityList = ["غزة", "جباليا", "خانيونس", "رفح"];

function ModalEdit({ setShowEdit }) {
  const [data, setData] = useState({});
  const user = useSelector((state) => state.User);
  const [coverReader, setCoverReader] = useState("");
  const [fileAvatar, setFileAvatar] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setData(user);
    console.log(user);
  }, [user]);

  const onFinish = async (e) => {
    e.preventDefault();
    let { avatar, city, description, facebook, fname, instagram, twitter } = data;

    if (
      (avatar || fileAvatar) &&
      description &&
      city &&
      fname &&
      (instagram || facebook || twitter)
    ) {
      setIsValid(false);
      uploadAVatar();
    } else {
      setIsValid(true);
    }
  };

  const uploadAVatar = () => {
    if (fileAvatar) {
      const path = `avatars/${Date.now()}_${fileAvatar.name.replace(/([^a-z0-9.]+)/gi, "")}`;
      let fileRef = ref(storage, path);
      const upload = uploadBytesResumable(fileRef, fileAvatar);
      upload.on(
        "state_changed",
        async (sanpshot) => {
          const progress = (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
          console.log(progress, " %");
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          let imgPath = await getDownloadURL(upload.snapshot.ref);
          console.log(imgPath);
          updateData(imgPath);
        }
      );
    } else {
      updateData(data.avatar);
    }
  };

  const updateData = async (avatar) => {
    const upData = doc(store, "users", user.id);
    await updateDoc(upData, { ...data, avatar }).then(() => {
      setShowEdit(false);
      location.reload();
    });
  };

  const setCover = (e) => {
    let file = e.target.files[0];
    setFileAvatar(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCoverReader(reader.result);
    };
  };

  return (
    <Dialog open={true} onClose={() => setShowEdit(false)}>
      <form onSubmit={onFinish} className="form__container">
        <DialogContent>
          {/* my avatar */}
          <label htmlFor="icon-button-file" className="label_edit_avatar">
            <Input
              accept="image/*"
              type="file"
              id="icon-button-file"
              name="logo"
              onChange={setCover}
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
                marginTop: "1rem",
              }}>
              <PhotoCamera sx={{ mr: 1, color: "#00A560" }} />
              ارفع صورة شخصية لك
            </Button>
            {coverReader && (
              <div className="cover_edit">
                <img src={coverReader} alt="" />
              </div>
            )}
            {user.avatar && !coverReader && (
              <div className="cover_edit">
                <img src={user.avatar} alt="" />
              </div>
            )}
          </label>

          {/* my description */}
          <TextField
            sx={{ width: "100%", marginTop: "1rem" }}
            name="description"
            id="description"
            multiline
            rows={2}
            focused={data.description ? true : false}
            value={data.description}
            label="أدخل وصف قصير عن نفسك"
            variant="outlined"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />

          {/* my location city */}
          <Autocomplete
            disablePortal
            value={data.city}
            options={cityList}
            sx={{ width: "100%", marginTop: "1rem" }}
            renderInput={(params) => <TextField {...params} label="الموقع" />}
            onChange={(e, sCity) => setData({ ...data, city: sCity })}
          />

          <div className="titlesocail">
            <span>مواقع تواصل اجتماعي</span>
          </div>
          <div className="contentsocail">
            <span>اضافتك لمواقع التواصل الاجتماعي يزيد من فرصة تعرف الناس عليك</span>
          </div>

          <TextField
            sx={{ width: "100%", marginTop: "1rem" }}
            name="facebook"
            id="facebook"
            label={<Facebook />}
            focused={data.facebook ? true : false}
            value={data.facebook}
            type="url"
            variant="outlined"
            onChange={(e) => setData({ ...data, facebook: e.target.value })}
          />
          <TextField
            sx={{ width: "100%", marginTop: "1rem" }}
            name="instagram"
            type="url"
            id="instagram"
            focused={data.instagram ? true : false}
            label={<Instagram />}
            value={data.instagram}
            variant="outlined"
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
          />
          <TextField
            sx={{ width: "100%", marginTop: "1rem" }}
            name="twitter"
            type="url"
            id="twitter"
            label={<Twitter />}
            focused={data.twitter ? true : false}
            value={data.twitter}
            variant="outlined"
            onChange={(e) => setData({ ...data, twitter: e.target.value })}
          />
        </DialogContent>
        {isValid && (
          <div className="title_vaild">
            <span>الرجاء ادخال جميع البيانات </span>
          </div>
        )}
        <DialogActions sx={{ mb: 2 }}>
          <button className="modalbtn">حفظ التعديلات</button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEdit;
