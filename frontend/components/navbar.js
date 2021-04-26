import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => (
    <div className={styles.frontbar}>
        <Link href="/home"><a> Home </a></Link> |
        <Link href="/books"><a> เช่าหนังสือ </a></Link> |
        <Link href="/total"><a> รายการหนังสือที่เช่า </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
    </div>
)

export default Navbar