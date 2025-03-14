
import axios from "axios";
import {setToken} from "@/store/reducers/tokenSlice";

const postLogin = (eMailRef, passwordRef) => {
        let eMail = eMailRef.current?.value;
        let password = passwordRef.current?.value;
        return async dispatch => {
            try{
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    eMail,
                    password
                })
                console.log(response?.data);
                dispatch(setToken(response?.data))
                localStorage.setItem('token', response?.data.token)
                //TODO здеся поменяй чтото в сторе
            }
            catch(e){
                console.log(e?.response?.data.message);
            }
            finally{
                console.log('Access login')
            }
        }
};

export default postLogin;