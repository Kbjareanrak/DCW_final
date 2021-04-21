import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => (
    <div className={styles.frontbar}>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> |  
        <Link href="/getConfig"><a> Config </a></Link> | 
        <Link href="/logout"><a> Logout </a></Link> 
    </div>
)

export default Navbar