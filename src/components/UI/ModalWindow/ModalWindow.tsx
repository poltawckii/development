import React, {ReactNode} from 'react';
import  styles from  './ModalWindow.module.css';
import KinoboxPlayer from "../KinoboxPlayer/KinoboxPlayer";

// Модальное окно
const ModalWindow = ({ isOpen, isClose, children, id } : {isOpen: boolean, isClose: () => void, children?: ReactNode, id: number}) => {
    if (!isOpen) return null; // Если модальное окно закрыто, ничего не отображаем
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    {children}
                    <button className={styles.modal_close_button} onClick={isClose}>
                    </button>
                    <KinoboxPlayer id={id}></KinoboxPlayer>
                </div>
            </div>
        </div>
    );
};
export default ModalWindow; // Экспортируем компонент для использования в других файлах
