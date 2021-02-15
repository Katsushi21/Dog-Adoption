import React, {useState} from "react";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import styles from "../../features/core/Core.module.css";
import {File} from "../types";
import {
    fetchAsyncUpdateData,
    fetchDataEnd,
    fetchDataStart,
    resetOpenEditData,
    selectData,
    selectOpenEditData,
} from "../dog_data/dog_dataSlice";
import {useParams} from "react-router-dom";

import {Button, IconButton, TextField} from "@material-ui/core";
import {MdAddAPhoto} from "react-icons/md";

const customStyles = {
    content: {
        top: "55%",
        left: "50%",
        width: 350,
        height: 440,
        padding: "50px",
        transform: "translate(-50%, -50%)",
    },
};


const EditData: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const openEditData = useSelector(selectOpenEditData);

    const {id} = useParams();
    // eslint-disable-next-line eqeqeq
    const preData = useSelector(selectData).find(e => e.id == id);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [observations, setObservations] = useState("");
    const [color, setColor] = useState("");
    const [hair, setHair] = useState("");
    const [reason, setReason] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const handlerEditPicture = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput?.click();
    };

    const editData = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet = {
            dataId: id, dogName: name, gender: gender, age: age, height: height, observations: observations,
            color: color, hair: hair, reason_for_arrival: reason, photo: image
        };
        await dispatch(fetchDataStart());
        await dispatch(fetchAsyncUpdateData(packet));
        await dispatch(fetchDataEnd());
        dispatch(resetOpenEditData());
    };

    const genderOption = [{value: "male", label: "Male"}, {value: "female", label: "Female"}];
    const hairOption = [{value: "long", label: "Long"}, {value: "middle", label: "Middle"},
        {value: "short", label: "Short"}];

    return (
        <>
            <Modal isOpen={openEditData}
                   onRequestClose={async () => {
                       await dispatch(resetOpenEditData());
                   }}
                   style={customStyles}>
                <form className={styles.core_signUp}>
                    <h1 className={styles.core_title}>Update Data</h1>
                    <br/>
                    {/*名前を入力*/}
                    <TextField
                        placeholder="Please enter the dog's name"
                        type="text"
                        value={preData?.dogName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/>
                    {/*性別を入力*/}
                    {genderOption.map(option => (
                        <label key={option.value}>
                            <input
                                type="radio"
                                value={option.value}
                                onChange={(e => setGender(e.target.value))}
                                checked={gender === option.value}
                            />
                            {option.label}
                        </label>

                    ))}
                    <br/>
                    {/*年齢を入力*/}
                    <input
                        placeholder="Please enter the dog age"
                        type="number"
                        min="0"
                        max="20"
                        value={preData?.age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <br/>

                    {/*大きさを入力*/}
                    <input
                        placeholder="Please enter the dog height"
                        type="number"
                        min="0"
                        max="200"
                        value={preData?.height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <br/>

                    {/*性格を入力*/}
                    <TextField
                        placeholder="Please enter the dog's observations"
                        type="text"
                        value={preData?.observations}
                        onChange={(e) => setObservations(e.target.value)}
                    />
                    <br/>

                    {/*毛色を入力*/}
                    <TextField
                        placeholder="Please enter the dog's color"
                        type="text"
                        value={preData?.color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <br/>

                    {/*毛の長さを入力*/}
                    {hairOption.map(option => (
                        <label key={option.value}>
                            <input
                                type="radio"
                                value={option.value}
                                onChange={(e => setHair(e.target.value))}
                                checked={hair === option.value}
                            />
                            {option.label}
                        </label>

                    ))}
                    <br/>

                    {/*保護された理由を入力*/}
                    <TextField
                        placeholder="Please enter the dog's reason for arrival"
                        type="text"
                        value={preData?.reason_for_arrival}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <br/>

                    {/*写真を登録*/}
                    <input
                        type="file"
                        id="imageInput"
                        hidden={true}
                        onChange={(e) => setImage(e.target.files![0])}
                    />
                    <br/>

                    <IconButton onClick={handlerEditPicture}>
                        <MdAddAPhoto/>
                    </IconButton>
                    <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={editData}
                    >
                        Update
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default EditData;