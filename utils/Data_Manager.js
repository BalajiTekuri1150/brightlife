export function setLocalData(id,value)
{
    let key=id.toLowerCase();
    let data=JSON.stringify(value);
    localStorage?.setItem(key,data);
}

export function getLocalData(id)
{
    let key=id.toLowerCase();
    let data=''
    try{
        data=localStorage?.getItem(key);
    }
    catch(err){
        console.log(err)
    }
    return (!!data) ? JSON.parse(data) : '';
}