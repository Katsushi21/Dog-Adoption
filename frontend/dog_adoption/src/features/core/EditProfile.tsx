import React, {useState} from "react";
import Modal from "react-modal";
import styles from "./Core.module.css";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {File} from "../types";
import {
    fetchCredStart, fetchCredEnd, fetchAsyncUpdateProfile,
    selectOpenProfile, selectProfile, resetOpenProfile,
} from "../auth/authSlice";
import {Button, TextField, IconButton} from "@material-ui/core";
import {MdAddAPhoto} from "react-icons/md";

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        width: 280,
        height: 250,
        padding: "50px",
        transform: "translate(-50%, -50%)",
    },
};

const EditProfile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const openProfile = useSelector(selectOpenProfile);
    const profile = useSelector(selectProfile);
    const [name, setName] = useState(profile.accountName);
    const [image, setImage] = useState<File | null>(null);

    const handleCloseModal = () => {
        setName(profile.accountName)
        setImage(null);
        dispatch(resetOpenProfile());
    }

    const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet = {id: profile.id, accountName: name, avatar: image};
        await dispatch(fetchCredStart());
        await dispatch(fetchAsyncUpdateProfile(packet));
        await dispatch(fetchCredEnd());
        await dispatch(resetOpenProfile());
    };

    const handlerEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    };

    return (
        <>
            <Modal isOpen={openProfile}
                   onRequestClose={async () => {
                       dispatch(handleCloseModal);
                   }}
                   style={customStyles}
            >
                <form className={styles.core_signUp}>
                    <h1 className={styles.core_edit_profile}>Edit Profile</h1>
                    <br/>
                    <TextField placeholder="Account Name"
                               type="text"
                               defaultValue={profile?.accountName}
                               onChange={(e) => setName(e.target.value)}/>
                    <input type="file" id="imageInput" hidden={true} onChange={(e) => setImage(e.target.files![0])}
                    />
                    <br/>
                    <IconButton onClick={handlerEditPicture}>
                        <MdAddAPhoto/>
                    </IconButton>
                    <br/>
                    <Button disabled={!profile?.accountName} variant="contained" color="primary"
                            type="submit" onClick={updateProfile}
                    >
                        Update
                    </Button>
                </form>
            </Modal>
        </>
    );
};
export default EditProfile;