import axios from "axios"
export const postData=async( url, data)=> {
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    }).catch(e => {return e.response});
    return response
}

export const postApplicationData=async( url, data,token)=> {
    const response = await axios({
        method: "POST",
        url:  url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "token "+token
        },
        data: data
    }).catch(e => {return e.response});
    return response
}