
import {RefObject} from 'react';
import axios from "axios";

const postRegistr = async ({eMailRef, passwordRef} : {eMailRef: RefObject<HTMLInputElement>, passwordRef: RefObject<HTMLInputElement>}) => {
        let eMail = eMailRef.current?.value;
        let password = passwordRef.current?.value;
        console.log(eMail, password);
        try {
            let response = await axios.post('http://localhost:5000/api/auth/registration', {
                eMail,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            alert(response?.data.message)
        }
        catch(e:any){
            console.log(e?.response?.data.message)
        }
        finally{
            console.log('User was registered');
        }

};

export default postRegistr;