import { useRouter } from "next/router";
import { getData } from "../../../utils/data_manage_service";
export default function child(){
    const router = useRouter()
    const handLeclick=async()=>{
        const result=await(getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${router?.query?.id}`))
        console.log(result.data)
    }
    return(
        <button onClick={handLeclick}>Hello</button>
        // <main className={homestyle.main}>
        //     <div className={homestyle.grid}>
        //    <div className={homestyle.card}>
        //             <p>{users.id}</p>
        //             <p>{users.name}</p>
        //             <p>{users.email}</p>
        //             <p>{users.company.name}</p>
        //             <p>{users.website}</p>
        //      </div>
        //     </div>
        // </main>
    );
}