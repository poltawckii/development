import React from 'react';
import styles from "@/app/film/About.module.css";
import AboutDescription from "@components/UI/AboutDescription/AboutDescription";
function DownBlock({arrayDescription}) {
    return (
        <div className={styles.obertka_about_info}>
            <h1>О фильме</h1>
            <div className={styles.obertka_Description_Film}>
                <div className={styles.About_Film}>
                    {arrayDescription?.map(
                        (item, index) => (
                            <div key={index} className={styles.Unit}>
                                <p>{item.key}</p>
                            </div>))}
                </div>
                <div className={styles.Description_Film}>
                    {arrayDescription?.map(
                        (item: { key: string, value: any[] | string | undefined | number },
                         index: number) => {
                            const valueArray = Array.isArray(item.value)
                                ? item.value
                                : [item.value];
                            return <AboutDescription
                                key={index}
                                value={valueArray}>
                            </AboutDescription>
                        })}
                </div>
            </div>
        </div>
    );
}

export default DownBlock;