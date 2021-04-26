import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbarName'
import React,{ useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import useSWR, { mutate } from 'swr'
import Link from 'next/link'
import ShowData from './showdata'
import withAuth from '../components/withAuth'

const URL = `http://localhost/api/books`
const fetcher = url => axios.get(url).then(res => res.data)


const Profile1 = ({token}) => {
  const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
  
    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>

  const showBook = () => {
    if (data.list && data.list.length) {
      return data.list.map((book, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>Name:</b> {book.bookName}</div>
            <br/>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };

    return (
        <Layout>
            <Head>
                <title>Data statement</title>
            </Head>
            <div className = {styles.navbarRight}>
              <Navbar />
            </div>
            <div className ={styles.front}>
              <h2 className={styles.toppicPad}>รายการหนังสือ</h2>
              <div className = {styles.padBook}>
                {showBook()}
                <button><a href="/books">Edit data</a></button>
              </div>
            </div>
            <br/>
            <ShowData/>
            <br/><br/>
            <div className={styles.padFinish}>
            <div className={styles.toppicPad}>
              <button><a href="/home">Finish</a></button>
            </div></div>
            
        
        </Layout>
    )
}
export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
