
import React from 'react';
import styles from "./ListHistory.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";

const ListHistory = () => {
    let history = useSelector(state => state.history.history);
    return (
        <div className={styles.block2_gridFavourites}>
            {history?.map((item, index) =>
                <Link href={'/film/' + item.id} className={styles.favourite}>
                    <img alt={'история' + index} key={index} src={item.url}></img>
                    {(item.rate === null) ? <></>
                        : <div className={styles.rateFilm}>
                            <h4>{item.rate}</h4>
                        </div>
                    }
                </Link>
            )}
        </div>
    );
};

export default ListHistory;