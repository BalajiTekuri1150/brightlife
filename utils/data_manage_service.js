import axios from "axios"
import { getLocalData } from "./storage_service";
export const postData=async( url, data)=> {
    const JSONdata = JSON.stringify(data)
    const token=getLocalData("token")
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "token "+token
        },
        data: JSONdata
    }).catch(e => {return e.response});
    return response
}

// export const postApplicationData=async( url, data,token)=> {
//     const response = await axios({
//         method: "POST",
//         url:  url,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': "token "+token
//         },
//         data: data
//     }).catch(e => {return e.response});
//     return response
// }