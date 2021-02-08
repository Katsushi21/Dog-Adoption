import React from "react";
import styles from "./DogData.module.css"
import {PROPS_DATA} from "../types";
import {IoFemale, IoMale} from "react-icons/all";
import {toCharUppercase} from "./dog_dataSlice";
import {Link} from "react-router-dom";


// 各保護犬データの一覧表示
const DogData: React.FC<PROPS_DATA> = ({
                                           dataId,
                                           loginId,
                                           dogName,
                                           gender,
                                           age,
                                           height,
                                           observations,
                                           color,
                                           hair,
                                           reason_for_arrival,
                                           photo,
                                           procedure,
                                           companyPost,
                                           registered_at,
                                       }) => {

    const packet = {
        dataId, loginId, dogName, gender, age, height, observations,
        color, hair, reason_for_arrival, photo, procedure, companyPost, registered_at
    }

    if (dogName) {
        return (
            <Link to={{pathname: `/${dataId}`, state: {detail: packet}}} className={styles.core_link}>
                <div className={styles.dog_data}>
                    <img className={styles.dog_data_image} src={photo} alt=""/>
                    <div className={styles.dog_data_name_container}>
                        <div className={styles.dog_data_name}>
                            {toCharUppercase(dogName)}
                        </div>
                        <div className={styles.dog_data_gender}>
                            {gender === "male" ?
                                <IoMale color="dodgerblue"/>
                                :
                                <IoFemale color="hotpink"/>
                            }
                        </div>
                    </div>
                    <div className={styles.dog_data_button}>
                        <div className={styles.dog_data_button_text}>
                            {procedure === "no" ?
                                "MEET ME !"
                                :
                                "in the process"
                            }
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
    return null;
};

export default DogData;