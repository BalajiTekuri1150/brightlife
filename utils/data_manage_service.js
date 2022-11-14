import axios from "axios"
import { getLocalData } from "./storage_service";
let JSONdata
export const postData=async( url, data,authorizaion,formdata=0)=> {
    formdata===1?JSONdata=data:JSONdata = JSON.stringify(data)
    let headers={'Content-Type': 'application/json'}
    if(authorizaion===1){
        Object.assign(headers, {"Authorization": "token "+getLocalData("token")})
    }
    const response = await axios({
        method: "POST",
        url:  url,
        headers: headers,
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

//please Don't Remove this
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
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSONdata
    }).catch(e => {return e.response});
    return response
}
