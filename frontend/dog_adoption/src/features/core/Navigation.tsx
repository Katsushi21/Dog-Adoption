import React, {useEffect} from "react";
import Auth from "../auth/Auth";
import styles from "./Core.module.css";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {Button, Avatar, CircularProgress} from "@material-ui/core";
import {SiDatadog} from "react-icons/all";
import {Link} from "react-router-dom"

import {
    fetchAsyncGetMyProfile,
    fetchAsyncGetProfiles,
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    selectIsLoadingAuth,
    selectProfile,
    setOpenProfile,
    resetOpenProfile,
    editAccountName,
} from "../auth/authSlice";

import {
    setOpenNewData, resetOpenNewData, fetchAsyncGetData, selectIsLoadingData, resetOpenEditData
} from "../dog_data/dog_dataSlice";

import EditProfile from "./EditProfile";
import NewData from "./NewData";

const Navigation: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const isLoadingData = useSelector(selectIsLoadingData);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);

    // ブラウザが起動した際に実行される処理
    useEffect(() => {
        const fetchBootLoader = async () => {
            if (localStorage.localJWT) {
                dispatch(resetOpenSignIn());
                const result = await dispatch(fetchAsyncGetMyProfile());
                if (fetchAsyncGetMyProfile.rejected.match(result)) {
                    dispatch(setOpenSignIn());
                    return null;
                }
                await dispatch(fetchAsyncGetData());
                await dispatch(fetchAsyncGetProfiles());
            }
        };
        fetchBootLoader().then(r => console.log(r));
    }, [dispatch]);

    return (
        <div>
            <Auth/>
            <EditProfile/>
            <NewData/>
            <div className={styles.core_header}>
                <Link to="/" className={styles.core_link} onClick={() => {
                    sessionStorage.removeItem("page")
                }}>
                    <h1 className={styles.core_title}>Dog Adoption</h1>
                </Link>
                {profile?.accountName ? (
                    <>
                        {profile.accountType === "company" ?
                            <button className={styles.core_btnModal}
                                    onClick={() => {
                                        dispatch(setOpenNewData());
                                        dispatch(resetOpenProfile());
                                        dispatch(resetOpenEditData());
                                    }}
                            >
                                <SiDatadog/>
                            </button> :
                            null
                        }
                        <div className={styles.core_logout}>
                            {(isLoadingData || isLoadingAuth) && <CircularProgress/>}
                            <Button onClick={() => {
                                localStorage.removeItem("localJWT");
                                dispatch(editAccountName(""))
                                dispatch(resetOpenProfile());
                                dispatch(resetOpenNewData());
                                dispatch(setOpenSignIn());
                            }}
                            >
                                Log Out
                            </Button>
                            <button className={styles.core_avatar}
                                    onClick={() => {
                                        dispatch(setOpenProfile());
                                        dispatch(resetOpenNewData());
                                        dispatch(resetOpenEditData());
                                    }}>
                                    <Avatar alt="Who?" src={profile.avatar}/>{" "}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles.core_logout}>
                        <Button onClick={() => {
                            dispatch(setOpenSignIn());
                            dispatch(resetOpenSignUp());
                        }}
                        >
                            Log In
                        </Button>
                        <Button onClick={() => {
                            dispatch(setOpenSignUp());
                            dispatch(resetOpenSignIn());
                        }}
                        >
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Navigation;