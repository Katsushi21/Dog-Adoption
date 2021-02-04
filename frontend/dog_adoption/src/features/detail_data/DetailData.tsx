import React from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectData, toCharUppercase} from "../dog_data/dog_dataSlice";
import {IoFemale, IoMale, MdKeyboardReturn} from "react-icons/all";
import styles from "./DetailData.module.css";
import {Button} from "@material-ui/core";

const DetailData = () => {
    const {id} = useParams();
    const detailData = useSelector(selectData);

    return (
        <div className={styles.detail_data}>
            <div className={styles.detail_back_container}>
                <Button className={styles.detail_back_button} color="default" variant="outlined"
                style={{fontSize: "36px"}}>
                    BACK<MdKeyboardReturn/>
                </Button>
            </div>
            {detailData && detailData.map(detail =>
                // eslint-disable-next-line eqeqeq
                id == detail.id ? (
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
                                        Color:
                                    </div>
                                    <div className={styles.detail_table_value}>
                                        {detail.color}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    ""
                )
            )}
        </div>
    );
};

export default DetailData