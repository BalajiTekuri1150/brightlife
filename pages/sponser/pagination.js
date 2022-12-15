import React from 'react';
import { useState } from 'react';
const Pagination=(props)=>
{
    let me=1;
    let next;
    let previous;
    let [page1,setPage1]=useState(1);
    const [disable,setDisable]=useState(true);
    // let [disable1,setDisable1]=useState(props.disable1);
    // console.log(disable1)
    const HandlePage=(e)=>{
        setPage1(parseInt(e.target.value));
        me=e.target.value;
        // setDisable1(false)
        if(me==="1")
        {
            setDisable(true);
        }
        if(e.target.value>1){
            setDisable(false);
        }
        props.pageHandler(me);
    }
    const HandlePrevious=()=>{
        previous=parseInt(page1)-1;
        console.log(previous);
        setPage1(page1-1);
        // setDisable1(false);
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
        setPage1(parseInt(page1)+1);
        if(next>1)
        {
            setDisable(false);
        }
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