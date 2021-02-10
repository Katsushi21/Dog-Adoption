import React from 'react'
import styles from "./DetailData.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectProfile} from "../auth/authSlice";
import {AppDispatch} from "../../app/store";
import {Button} from "@material-ui/core";

const DetailButton: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);

    return (
        <div className={styles.detail_button_container}>
            {profile.accountType === "company" ?
                <>
                    <Button variant="contained" color="primary">
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary">
                        Delete
                    </Button>
                </>
                :
                null}
        </div>
    )
}

export default DetailButton
