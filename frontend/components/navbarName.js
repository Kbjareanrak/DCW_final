import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => (
    <div className={styles.frontbar}>
        <Link href="/home"><a> Home </a></Link> |
        <Link href="/Boo"><a> รายการหนังสือ </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
    </div>
)

export default Navbar