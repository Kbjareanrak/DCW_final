import Link from 'next/link'
import styles from '../styles/Home.module.css'

const NavbarHome = () => (
    <div className={styles.frontbar}>
        <Link href="/register"><a> Sign up </a></Link>  |
        <Link href="/login"><a> Sign in</a></Link>
    </div>
)

export default NavbarHome