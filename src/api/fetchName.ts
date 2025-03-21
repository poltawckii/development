import axios from 'axios';
import React from "react";

const fetchFilters = async (refName : React.RefObject<HTMLInputElement> )  => {
    let name = refName.current?.value;
    try {
        //TODO в зависимости от наличии велю рефов добавлять в запрос(запрос - станет переменной) параметры и их значения.
        const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=250&query=${name}`, {
            headers: {
                'X-API-KEY': 'ZNM091Z-2ZXMW0T-P2WFRHG-3TX3DHC',
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        return response?.data.docs;
    } catch (error) {
        console.error('Ошибка при запросе трейлера:', error);
        return null; // Или выбросить ошибку если требуется
    }
};
export default fetchFilters;