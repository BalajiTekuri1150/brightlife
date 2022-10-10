import Link from 'next/link';
import style from '../styles/navbar.module.css';
const Navbar=()=>
{
    return(
        <div className={style.nav}>
            <ul className={style.uli}>
                <li style={{marginRight:'20px'}}><Link href="/About">About</Link></li>
                <li><Link href="/">Home</Link></li>
            </ul>
        </div>
    );
}
export default Navbar;