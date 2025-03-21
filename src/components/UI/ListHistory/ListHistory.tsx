
import React from 'react';
import styles from "./ListHistory.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";
import {IState} from "@/types/IState";

const ListHistory = () => {
    let history = useSelector((state: IState) => state.history?.history);
    return (
        <div className={styles.block2_gridFavourites}>
            {history?.map((item, index) =>
                <Link href={'/film/' + item.id} key={index} className={styles.favourite}>
                    <img alt={'история' + index} src={item.url}></img>
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