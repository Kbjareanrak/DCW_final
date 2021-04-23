import Link from 'next/link'
import styles from '../styles/Home.module.css'

const NavbarLog = () => (
    <div className={styles.frontbar}>
        <Link href="/"><a> Home </a></Link>|
        <Link href="/register"><a> Sign up </a></Link>
    </div>
)

export default NavbarLog