import React from 'react';
import styles from "../ListHistory/ListHistory.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";

const ListFavourites = () => {
    let listFavourites =  useSelector(state => state.favourites.list);
    return (
        <div className={styles.block2_gridFavourites}>
            {listFavourites?.map((item, index) =>
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

export default ListFavourites;