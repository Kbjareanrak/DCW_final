import Head from 'next/head' 
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import NavbarHome from '../components/navbarhome'
import Slideshow from '../pages/home/picHome'
import AlbumBook from '../pages/home/albumBook'
export default function Home({ token }) {

  const headderForm = () => (
    <div className={styles.bgHeader}>
      <div className ={styles.navbarRight}>
        <NavbarHome />
      </div>
      <div className= {styles.header}>
        <h1 >BOR SHOP</h1>
      </div>
    </div>
  )

  const descPart = () => (
    <div className={styles.para}>
      <p>บทความเล็กน้อยที่ควรอธิบายว่า เว็บทำเกี่ยวกับอะไร</p>
    </div>
  )

  const newBooks = () => (
    <div>
      <div className = {styles.front}>
          <h3 className={styles.toppicPad}><b>หนังสือมาใหม่</b></h3>
      </div>
      <div className= {styles.position1}>  
        <Slideshow/>
      </div>
    </div>
  )

  const manuBooks = () => (
    <div>
    <div className = {styles.front}>
        <h3 className={styles.toppicPad}><b>รายการหนังสือทั้งหมด</b></h3>
    </div>
    <div className= {styles.position2}>
      <AlbumBook/>
    </div>
  </div>

  )

  const googleMap = () => (
    <div>
    <h3 className={styles.toppicPad}><b>Google Maps</b></h3>
    </div>

  )

  const address = () => (
    <div className= {styles.front}>
      <div className= {styles.footer}>
        <h3>Contact</h3>
          <div>
            Email: bins_aptx@hotmail.com <br/><br/>
            Tel. 02134567
          </div>
      </div>
    </div>
  )

  return (
    <Layout>
    <Head>
        <title>BOR Shop</title>
    </Head>
     {headderForm()}

    {/* Body */}
    {descPart()}
    {newBooks()}
    {manuBooks()}
    {googleMap()}
    

    {/* Footer */}
    {address()}

    </Layout>
  )
}