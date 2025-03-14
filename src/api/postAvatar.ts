import axios from "axios";
import {setToken} from "@/store/reducers/tokenSlice";

const PostAvatar = (eMail, url) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/avatar', {
                url,
                eMail
            })
            console.log(response)
            dispatch(setToken(response?.data.user))
        } catch (e) {
            console.log(e)
        }
    }
};

export default PostAvatar;