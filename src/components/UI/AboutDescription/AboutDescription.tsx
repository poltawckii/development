import React from 'react';
import styles from './AboutDescription.module.css';

interface AboutDescriptionProps {
    value: string[] | string;
    children?: never[];
}
function AboutDescription({value} : AboutDescriptionProps) {
    if (Array.isArray(value) && (value?.length > 2)) {
        value = value.slice(0, 2);
        value[1] = value[1].slice(0, value[1].length-1) +'...';
    }
    else if ((Array.isArray(value) && (value?.length === 2) && (value[0] === String))){
        value = value.slice(0, 2);
        console.log(value)
        value[1] = value[1].slice(0, value[1].length-5);
    }
    else if ((Array.isArray(value) && (value?.length == 1) && (value[0] === String))){
        value = value.slice(0, 1);
        value[0] = value[0].slice(0, value[0].length-1);

    }
    else if ((Array.isArray(value) && (value?.length == 0) && (value[0] === String))){
        value = 'Неизвестно';
    }
    return (
        <div className={styles.Unit}>
            <div className={styles.value}>
                {(Array.isArray(value))
                    ? (value.map((item, index) => (<a key={index}>{item}</a>)))
                    : (<a key={value}>{value}</a>)
                }
            </div>
        </div>
    );
}

export default AboutDescription;