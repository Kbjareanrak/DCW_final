import Head from 'next/head' 
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import NavbarHome from '../components/navbarhome'
import Slideshow from '../pages/home/picHome'
import AlbumBook from '../pages/home/albumBook'
import Map from './map'


export default function Home() {

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
      <p>เป็นเว็บเช่าหนังสือของร้าน BOR Shop (อ่านว่า บี โอ อาร์ ช็อป) 
        คุณลูกค้าสามารถดูรายชื่อหนังสือต้องการเช่าได้จากในระบบ 
       </p> 
       <p>
         สามารถทำการเช่าผ่านทางเว็บไซต์ แล้วมารับหนังสือ 
        พร้อมกับชำระเงินที่หน้าร้านค่ะ (หากต้องการจองสินค้า กรุณา Login)
         </p>
      <p>ขอบคุณที่ใช้บริการร้านเราค่ะ</p>
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
    <Map/>
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
    <div>
      <br/>
    {descPart()}
    {newBooks()}
    {manuBooks()}
    {googleMap()}
    
    {/* Footer */}
    {address()}
    </div>
    </Layout>
  )
}