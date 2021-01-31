import React, {useState} from 'react'
import styles from "./Core.module.css";
import {TextField, Toolbar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


const SearchBar = () => {
    // const [filter, setFilter] = useState("");

    return (
        <Toolbar>
            <div className={styles.searchContainer}>
                <SearchIcon className={styles.searchIcon}/>
                <TextField className={styles.searchInput}
                           label="Free Word Search"
                           variant="standard"
                    // onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </Toolbar>
    )
}

export default SearchBar
