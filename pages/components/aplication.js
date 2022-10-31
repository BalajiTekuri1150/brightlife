import Kids_details from "../components/kids_Details"
export default function Form(){
    return(
        <div className="wrapper" >
            <nav className="navbar fixed-top navbar-expand-lg" style={{"backgroundColor":" #00004d"}}>
                <p className="navbar-brand text-light m-2 px-5">Logo</p>
            </nav>
            <div className="row h-100 mt-5">
                <div className="border border-dark bg-white mt-5" style={{"width":"250px","height":"600px"}}>
                    <ul className=" col-2 sidebar-menu">
                        <li className="text-dark m-5">Myprofile</li>
                        <li className="text-dark m-5">Applications</li>
                    </ul>
                </div>
                <div className="bg-white mt-5" style={{"width":"1100px","height":"600px"}}>
                    <section className="content-header m-5">Ribbon</section>
                    <Kids_details/>
                </div>
            </div>
        </div>
    )
}