import React, { useEffect, useRef } from 'react';
import styles from './DropDownMenu.module.css';
import DropDownMenuFilm from '../DropDownMenu/DropDownMenuFilm';

function DropDownMenu({films} : {films: Array<any> | undefined}) {
    let ref = useRef<HTMLDivElement>(null);

    useEffect(() => { // Используем useEffect, чтобы этот код выполнялся после рендера
        if (ref.current && films) {
            ref.current.style.display = films?.length !== 0 ? 'block' : 'none';
        }
    }, [films]); // Зависимость от films чтобы выполнялся при изменении

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                ref.current.style.display = 'none';
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside); //  Очистка
        };
    }, [ref]);

    return (
        <div ref={ref} className={styles.dropdown_menu}>
            {films && <DropDownMenuFilm arrInfo={films}></DropDownMenuFilm>}
        </div>
    );
}
export default DropDownMenu;