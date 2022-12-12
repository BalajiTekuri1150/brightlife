import React from 'react';
import { useState } from 'react';
const Pagination=(props)=>
{
    // let pageNumbers=[1,2,3,4,5,6,7,8,9,10];
    // for(let i=1;i<Math.ceil(data.length/9)+1;i++)
    // {
    //     pageNumbers.push(i);
    // }
    let me=1;
    let next;
    let previous;
    let [page1,setPage1]=useState(1);
    const [disable,setDisable]=useState(true);
    const HandlePage=(e)=>{
        console.log("page1 is:"+e.target.value);
        setPage1(parseInt(e.target.value));
        me=e.target.value;
        if(e.target.value==="1")
        {
            setDisable(true);
        }
        else{
            setDisable(false);
        }
        console.log("me is:"+me);
        props.pageHandler(me);
    }
    const HandlePrevious=()=>{
        previous=parseInt(page1)-1;
        console.log(previous);
        setPage1(page1-1);
        if(previous<=1)
        {
            setDisable(true);
        }
        else{
            setDisable(false);
        }
        props.pageHandler(previous);
    }
    const HandleNext=()=>
    {
        next=parseInt(page1)+1;
        console.log("next");
        console.log(next);
        setPage1(parseInt(page1)+1);
        // if((page1+1)>1)
        // {
        //     setDisable(false);
        // }
        // else{
        //     setDisable(true);
        // }
        props.pageHandler(next);
    }
    return(
        <div>
            {/* <center>
                {pageNumbers.map(page=><div className="btn btn-outline-dark" style={{marginRight:'3px'}}
                onClick={()=>pageHandler(page)}>{page}</div>)}
            </center> */}
            <div>
                <button className='btn btn-outline-dark btn btn-success' onClick={HandlePrevious} disabled={disable}>PREVIOUS</button>&nbsp;
                <button className='btn btn-outline-dark' onClick={HandlePage} value={1}>1</button>&nbsp;
                <button className='btn btn-outline-dark' onClick={HandlePage} value={2}>2</button>&nbsp;
                <button className='btn btn-outline-dark' onClick={HandlePage} value={3}>3</button>&nbsp;
                <button className='btn btn-outline-dark' onClick={HandlePage} value={4}>4</button>&nbsp;
                <button className='btn btn-outline-dark btn btn-success' onClick={HandleNext} disabled={props.disable1}>NEXT</button>
            </div>
        </div>
    );
}
export default Pagination;