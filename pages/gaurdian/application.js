import Gaurdian_details from "./gaurdian_details";
import Kids_details from "./kids_Details"
import Education_details from "./education_details";
import Required_documents from "./required_documents"
import Bank_details from "./bank_details"
import { useState} from "react"
import Link from "next/link";
export default function Application(){
    const [screen, setscreen] = useState(1);
    const toggleChecked = () => {setscreen(screen+1)};
    return (
        <div className="wrapper" >
        <nav className="navbar fixed-top navbar-expand-lg" style={{"backgroundColor":" #00004d"}}>
            <p className="navbar-brand text-light m-2 px-5">Logo</p>
        </nav>
            <div className="row h-100 mt-5">
                <div className="border border-dark bg-white mt-5" style={{"width":"350px","height":"1000px"}}>
                    <ul className=" col-2 sidebar-menu">
                        <Link href="/gaurdian/gaurdian_profile"><p className="text-dark m-5 pe-auto">Myprofile</p></Link>
                        <Link href="/gaurdian/gaurdian_dashboard"><p className="text-dark m-5">Applications</p></Link>
                    </ul>
                </div>
                <div className="bg-white mt-5" style={{"width":"1500px","height":"900px"}}>
                    {screen==1 && <Kids_details screenvalue={toggleChecked}/> }
                    {screen==2 && <Gaurdian_details screenvalue={toggleChecked}/> }
                    {screen==3 && <Education_details screenvalue={toggleChecked}/> }
                    {screen==4 && <Required_documents screenvalue={toggleChecked}/> }
                    {screen==5 && <Bank_details screenvalue={toggleChecked}/> }
                </div>
            </div>
        </div>
    )
}