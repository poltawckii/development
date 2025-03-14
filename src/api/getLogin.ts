
import axios from "axios";
import {setToken} from "@/store/reducers/tokenSlice";

const getLogin = () => {
    return async dispatch => {
        console.log(localStorage);
        try{
            const response = await axios.get('http://localhost:5000/api/auth/auth',
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setToken(response?.data))
            localStorage.setItem('token', response?.data.token)
        }
        catch(e){
            console.log(e?.response?.data.message);
            localStorage.removeItem('token')
        }
        finally{
            console.log('Access login')
        }
    }
};

export default getLogin;