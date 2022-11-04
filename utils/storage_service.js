export function setLocalData(id, value) {
    let key =  id.toLowerCase();
    let data = JSON.stringify(value);
    localStorage?.setItem(key, data);
}

export function getLocalData(id) {
    let key =  id.toLowerCase();
    let data
    try {  
        data=localStorage?.getItem(key);
    } catch (error) {
        console.log(error)
    } 
    return (!!data) ? JSON.parse(data) : '';
    // return JSON.parse(localStorage.getItem(key));
    // return data
}

export function getSessionData(id) {
    let key = id.toLowerCase();
    let data =''
    try {  
        data=sessionStorage?.getItem(key);
    } catch (error) {
        console.log(error)
    } 
    return (!!data) ? JSON.parse(data) : '';
}

export function removeSessionData(id) {
    let key = id.toLowerCase();
    sessionStorage?.removeItem(key);
}

export function setSessionData(id, value) {
    let key = id.toLowerCase();
    console.log(id,value)
    let data = JSON.stringify(value);
    sessionStorage.setItem(key, data)
}
