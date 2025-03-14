
"use client"
import React from 'react';
import{ useEffect, useRef } from "react";
import styles from "./KinoboxPlayer.module.css"
interface Props {
    id?: object;
}

function KinoboxPlayer( id : Props) {
    id = id?.id;
    console.log(id);
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://kinobox.tv/kinobox.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (containerRef.current) {
                (window as any).kbox(containerRef.current, {
                    search: { kinopoisk: id },
                    menu: {
                        enabled: false,
                    }
                });
            }
        };

        return () => {
            try {
                document.body.removeChild(script);
            } catch (e) {}
        };
    }, [id]);

    return (<div ref={containerRef} className={styles.kinobox_player}></div>);
}

export default KinoboxPlayer;