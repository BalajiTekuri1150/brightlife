import Link from "next/link"
export default function kids_dashboard(){
    return(
        <>
            <div className="wrapper" >
                <nav className="navbar fixed-top navbar-expand-lg" style={{"backgroundColor":" #00004d"}}>
                    <p className="navbar-brand text-light m-2 px-5">Logo</p>
                </nav>
                <div className="row h-100 mt-5">
                    <div className="border border-dark bg-white mt-5" style={{"width":"350px","height":"1000px"}}>
                        <ul className=" col-2 sidebar-menu">
                            <Link href="/gaurdian/kids_Details"><p className="text-dark m-5">Kids Details</p></Link>
                            <Link href="/gaurdian/gaurdian_details"><p className="text-dark m-5 pe-auto">Gaurdian Details</p></Link>
                            <Link href="/gaurdian/education_Details"><p className="text-dark m-5">Education Details</p></Link>
                            <Link href="/gaurdian/required_documents"><p className="text-dark m-5 pe-auto">Recquired Documents</p></Link>
                            <Link href="/gaurdian/bank_details"><p className="text-dark m-5">Bank Details</p></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}