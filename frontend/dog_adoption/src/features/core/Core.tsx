import React, {useState} from "react";
import styles from "./Core.module.css";
import {useSelector} from "react-redux";
import {Grid} from "@material-ui/core";
import {selectProfile,} from "../auth/authSlice";
import {selectData} from "../dog_data/dog_dataSlice";
import DogData from "../dog_data/DogData"
import ReactPaginate from "react-paginate";


const Core: React.FC = () => {
    const profile = useSelector(selectProfile);
    const some_data = useSelector(selectData);

    // ページネーションに関する記述
    const initialPage = Number(sessionStorage.getItem("page"))
    const [pageNumber, setPageNumber] = useState(initialPage);
    const dataPerPage = 6;
    const marginPagesDisplayed = 6;
    const pageRangeDisplayed = 3;
    const pagesVisited = pageNumber * dataPerPage;
    const dataCount = Math.ceil(some_data.length / dataPerPage);
    const changePage = ({selected}: any) => {
        setPageNumber(selected);
    };
    sessionStorage.setItem("page", String(pageNumber))


    return (
        <>
            <div className={styles.core_background}>
                <div className={styles.core_data}>
                    <Grid container spacing={4}>
                        {some_data
                            .slice(pagesVisited, pagesVisited + dataPerPage)
                            .map((data) =>
                                <Grid key={data.id} item xs={12} md={4}>
                                    <DogData
                                        dataId={data.id}
                                        loginId={profile.accountProfile}
                                        dogName={data.dogName}
                                        gender={data.gender}
                                        age={data.age}
                                        height={data.height}
                                        observations={data.observations}
                                        color={data.color}
                                        hair={data.hair}
                                        reason_for_arrival={data.reason_for_arrival}
                                        photo={data.photo}
                                        procedure={data.procedure}
                                        companyPost={data.companyPost}
                                        registered_at={data.registered_at}
                                    />
                                </Grid>
                            )}
                    </Grid>
                </div>
                <div className={styles.pagination}>
                    <ReactPaginate pageCount={dataCount}
                                   previousLabel={"Previous"}
                                   nextLabel={"Next"}
                                   marginPagesDisplayed={marginPagesDisplayed}
                                   pageRangeDisplayed={pageRangeDisplayed}
                                   onPageChange={changePage}
                                   containerClassName={styles.paginationButtons}
                                   previousLinkClassName={"previousButton"}
                                   nextLinkClassName={"nextButton"}
                                   disabledClassName={"paginationDisabled"}
                                   activeClassName={styles.paginationActive}
                                   initialPage={initialPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Core;