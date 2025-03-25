"use client"
import {useCallback, useEffect, useRef, useState} from 'react';
import axios from "axios";
import _ from "lodash";
import {API_KEY, API_URL} from "@constants/api";
function UseNavbarReq(newValue: string | '') {
    let [value, setValue] = useState(newValue);
    const [posters, setPosters] = useState<{films: Array<any>} | undefined >();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const lastValue = useRef(newValue);
    useEffect(() => {
        if (newValue === lastValue.current) {
            return;
        }
        setValue(newValue);
        lastValue.current = newValue;
    }, [newValue]);
    const fetchPosters = useCallback(async (value: string | '') => {
        setLoading(true); // Устанавливаем загрузку перед запросом
        try {
            const response = await axios.get(`${API_URL}/v2.1/films/search-by-keyword?keyword=${value}`, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            setPosters(response.data); // Предполагается, что данные находятся в response.data
            console.log(value);
            console.log(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);
    const debouncedFetchPosters = useCallback(
        _.debounce(fetchPosters, 300),
        []
    );
    useEffect(() => {
        debouncedFetchPosters(value);
        return () => {
            debouncedFetchPosters.cancel(); // Очистка debounce при удалении компонента
        };
    }, [value, debouncedFetchPosters]);
    useEffect(() => {
    }, [debouncedFetchPosters])
    return (posters);
}

export default UseNavbarReq;