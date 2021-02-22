import React, {useEffect} from "react";
import Auth from "../auth/Auth";
import styles from "./Core.module.css";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {Button, Avatar} from "@material-ui/core";
import {SiDatadog} from "react-icons/all";
import {Link} from "react-router-dom"

import {
    fetchAsyncGetMyProfile,
    fetchAsyncGetProfiles,
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    selectProfile,
    setOpenProfile,
    resetOpenProfile,
    editAccountName, fetchCredStart, fetchAsyncLogin, fetchCredEnd,
} from "../auth/authSlice";

import {
    setOpenNewData, resetOpenNewData, fetchAsyncGetData, resetOpenEditData
} from "../dog_data/dog_dataSlice";

import EditProfile from "./EditProfile";
import NewData from "./NewData";

const Navigation: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);

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


    const handleChangeUserType = async (input: any) => {
        localStorage.removeItem("localJWT");
        await dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncLogin(input));
        if (fetchAsyncLogin.fulfilled.match(result)) {
            await dispatch(fetchAsyncGetProfiles());
            await dispatch(fetchAsyncGetMyProfile());
        }
        await dispatch(fetchCredEnd());
        await dispatch(resetOpenSignIn());
    }

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
                        {profile.id === 7 ?
                            <Button variant="contained" color="secondary" onClick={() => {
                                handleChangeUserType({
                                    email: "oguest@xxx.com",
                                    password: "xxx"
                                }).then(r => console.log((r)))
                            }}>ユーザータイプを飼い主に</Button>
                            :
                            null}
                        {profile.id === 8 ?
                            <Button variant="contained" color="secondary" onClick={() => {
                                handleChangeUserType({
                                    email: "cguest@xxx.com",
                                    password: "xxx"
                                }).then(r => console.log((r)))
                            }}>ユーザータイプを保護団体に</Button>
                            :
                            null}
                        <div className={styles.core_logout}>
                            <Button onClick={() => {
                                localStorage.removeItem("localJWT");
                                localStorage.removeItem("guest");
                                dispatch(editAccountName(""));
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