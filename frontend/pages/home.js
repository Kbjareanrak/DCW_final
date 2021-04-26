import Head from 'next/head' 
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Slideshow from './home/picHome'
import AlbumBook from './home/albumBook'
import Map from './map'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Home = ({ token }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/home`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

  const headderForm = () => (
    <div className={styles.bgHeader}>
      <div className ={styles.navbarRight}>
        <Navbar/>
      </div>
      <div className= {styles.header}>
        <h1 >BOR SHOP</h1>
      </div>
    </div>
  )

  const descPart = () => (
    <div className={styles.para}>
      <p>เป็นเว็บยืมหนังสือของร้าน BOR Shop (อ่านว่า บี โอ อาร์ ช็อป) 
        คุณลูกค้าสามารถดูรายชื่อหนังสือต้องการหยิบยืมได้จากในระบบ 
        สามารถทำการจองผ่านทางเว็บไซต์ แล้วทำการมารับหนังสือ 
        พร้อมกับชำระเงินที่หน้าร้านค่ะ</p>
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
    <br/>
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
      {descPart()}
      {newBooks()}
      {manuBooks()}
      {googleMap()}

      {/* Footer */}
      {address()}

    </Layout>
  )
} 
export default withAuth(Home);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}