import axios from "axios"
import { getLocalData } from "./storage_service";
let JSONdata
export const postData=async( url, data,bool=0)=> {
    bool===1?JSONdata=data:JSONdata = JSON.stringify(data)
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

export const getData=async( url)=> {
    const token=getLocalData("token")
    const response = await axios({
        method: "GET",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "token "+token
        },
    }).catch(e => {return e.response});
    return response
}

//Don't Remove this
export const postData2=async( url, data)=> {
    const JSONdata = JSON.stringify(data)
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token 2d21e847092508ace5f534ac492bf03cd742145a'
        },
        data: JSONdata
    }).catch(e => {return e.response});
    return response
}

export const postData1=async( url, data)=> {
    const JSONdata = JSON.stringify(data)
    // const token=getLocalData("token")
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': "token "+token
        },
        data: JSONdata
    }).catch(e => {return e.response});
    return response
}
