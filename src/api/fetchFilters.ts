import axios from 'axios';

const fetchFilters = async (typeRef, genreRef, yearRef, yearStartRef, yearEndRef, ageRef, countryRef) => {
    let type = typeRef.current?.value;
    let genre = genreRef.current?.value;
    let year = yearRef.current?.value;
    let yearStart = yearStartRef.current?.value;
    let yearEnd = yearEndRef.current?.value;
    let age = ageRef.current?.value;
    let country = countryRef.current?.value;

    let url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=${type}&year=${year}&releaseYears.start=${yearStart}&releaseYears.end=${yearEnd}&ageRating=${age}&genres.name=${genre}&countries.name=${country}`;
    let arrFilters = [type, genre, year, yearStart, yearEnd, age, country];
    let arrDelete = arrFilters.reduce((indices, element, index) => {
            if (element === '') indices.push(index);
            return indices;
        }, []); // Начальное значение - пустой массив
    let newurl = arrDelete.map((item) => {
        switch (item){
            case (0):
                url = url.split("&type=").join("");
                break;
            case (1):
                url = url.split("&genres.name=").join("");
                break;
            case (2):
                url = url.split("&year=").join("");
                break;
            case (3):
                url = url.split("&releaseYears.start=").join("");
                break;
            case (4):
                url = url.split("&releaseYears.end=").join("");
                break;
            case (5):
                url = url.split("&ageRating=").join("");
                break;
            case (6):
                url = url.split("&countries.name=").join("");
                break;
        }
    })
    try {
        //TODO в зависимости от наличии велю рефов добавлять в запрос(запрос - станет переменной) параметры и их значения.
        const response = await axios.get(`${url}`, {
            headers: {
                'X-API-KEY': 'ZNM091Z-2ZXMW0T-P2WFRHG-3TX3DHC',
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        return response?.data.docs;
    } catch (error) {
        console.error('Ошибка при запросе трейлера:', error);
        return null; // Или выбросить ошибку если требуется
    }
};
export default fetchFilters;