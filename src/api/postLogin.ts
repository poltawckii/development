
import axios from "axios";
import {setToken} from "@/store/reducers/tokenSlice";
import {RefObject} from "react";

const postLogin = (eMailRef : RefObject<HTMLInputElement>, passwordRef : RefObject<HTMLInputElement>) => {
        let eMail = eMailRef.current?.value;
        let password = passwordRef.current?.value;
        return async (dispatch:any) => {
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
            catch(e:any){
                console.log(e?.response?.data.message);
            }
            finally{
                console.log('Access login')
            }
        }
};

export default postLogin;