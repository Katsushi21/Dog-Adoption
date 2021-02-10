import React from "react";
import {useLocation} from "react-router-dom";
import {toCharUppercase} from "../dog_data/dog_dataSlice";
import {IoFemale, IoMale, MdKeyboardReturn} from "react-icons/all";
import styles from "./DetailData.module.css";
import {Avatar, Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectProfile, selectProfiles} from "../auth/authSlice";

const DetailData = () => {
    const {state: {detail}} = useLocation();
    const profiles = useSelector(selectProfiles);
    const prof = profiles.filter((prof) => {
        return prof.accountProfile === detail.companyPost;
    });
    const profile = useSelector(selectProfile);

    return (
        <div className={styles.detail_data}>
            <div className={styles.detail_back_container}>
                <Button className={styles.detail_back_button} color="default" variant="outlined"
                        style={{fontSize: "36px"}}>
                    BACK<MdKeyboardReturn/>
                </Button>
            </div>
            <div className={styles.detail_container}>
                <div className={styles.detail_left}>
                    <div className={styles.detail_name_container}>
                        <div className={styles.detail_name}>
                            <h1 className={styles.detail_name}>{toCharUppercase(detail.dogName)}</h1>
                        </div>
                        <div className={styles.detail_gender}>
                            {detail.gender === "male" ?
                                <IoMale color="dodgerblue"/>
                                :
                                <IoFemale color="hotpink"/>
                            }
                        </div>
                        <div className={styles.detail_age_height_container}>
                            <div className={styles.detail_age_height}>
                                {detail.age} year(s) old
                            </div>
                            <div className={styles.detail_divider}>
                                |
                            </div>
                            <div className={styles.detail_age_height}>
                                {detail.height} cm
                            </div>
                        </div>
                    </div>
                    <img className={styles.detail_image} src={detail.photo} alt=""/>
                </div>
                <div className={styles.detail_right}>
                    <ul className={styles.detail_table_container}>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Color :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.color}
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Hair :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.hair}
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Reason for arrival :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.reason_for_arrival}
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Observations :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.observations}
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Organization :
                            </div>
                            <div className={styles.detail_table_value}>
                                <div className={styles.detail_organization_container}>
                                    <Avatar className={styles.detail_avatar} src={prof[0]?.avatar}/>
                                    <div className={styles.detail_organization}>
                                        {prof[0]?.accountName}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                Registered :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.registered_at}
                            </div>
                        </li>
                        <li className={styles.detail_table}>
                            <div className={styles.detail_table_type}>
                                During dealing :
                            </div>
                            <div className={styles.detail_table_value}>
                                {detail.registered_at}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.detail_button_container}>
                {profile.accountType === "company" && profile.accountProfile === detail.companyPost ?
                    <>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                        <Button variant="contained" color="secondary">
                            Delete
                        </Button>
                    </>
                    :
                    null
                }
                {profile.accountType === "ordinary" && detail.procedure === "no" ?
                    <>
                        <Button variant="contained" color="primary">
                            Donate
                        </Button>
                        <Button variant="contained" color="secondary">
                            Adopt
                        </Button>
                    </>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default DetailData