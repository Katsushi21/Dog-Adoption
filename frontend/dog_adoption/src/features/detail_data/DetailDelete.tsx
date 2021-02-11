import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectProfile} from "../auth/authSlice";
import {AppDispatch} from "../../app/store";
import {fetchAsyncDeleteData} from "../dog_data/dog_dataSlice";


const DeleteData: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);


    return (
        <div>

        </div>
    )
}

export default DeleteData;