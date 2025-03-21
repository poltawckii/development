import React from 'react';
import styles from "../ListHistory/ListHistory.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";
import {IState} from "@/types/IState";

const ListFavourites = () => {
    let listFavourites =  useSelector((state: IState) => state.favourites?.list);
    return (
        <div className={styles.block2_gridFavourites}>
            {listFavourites?.map((item, index) =>
                <Link href={'/film/' + item.id} className={styles.favourite} key={index}>
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

export default ListFavourites;