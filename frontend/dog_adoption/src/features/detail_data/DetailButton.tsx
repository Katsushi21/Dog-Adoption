import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectProfile} from "../auth/authSlice";
import {AppDispatch} from "../../app/store";
import {fetchAsyncDeleteData} from "../dog_data/dog_dataSlice";


export const DeleteData = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
}