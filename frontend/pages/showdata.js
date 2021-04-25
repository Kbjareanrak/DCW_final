import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import React,{ useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import useSWR, { mutate } from 'swr'
import Link from 'next/link'

const URL = `http://localhost/api/infos`
const fetcher = url => axios.get(url).then(res => res.data)


const showdata = ({token}) => {
  // const [user, setUser] = useState({})

  //   useEffect(() => {
  //       profileUser()
  //   }, [])

  //   const profileUser = async () => {
  //       try {
  //           // console.log('token: ', token)
  //           const users = await axios.get(`${config.URL}/profile`, {
  //               headers: { Authorization: `Bearer ${token}` }
  //           })
  //           // console.log('user: ', users.data)
  //           setUser(users.data)
  //       }
  //       catch (e) {
  //           console.log(e)
  //       }

  //   }
  
    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>
  //  console.log(data)
   // if (!data_info) return <div>Loading...</div>

  const showInfo = () => {
    if (data.list && data.list.length) {
      return data.list.map((info, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>Name:</b> {info.name}</div>
            <div><b>Phone:</b> {info.phone}</div>
            <div><b>Day:</b> {info.day}</div>
            <br/>
            <div><Link href="/infos"><a><b>Edit data</b> </a></Link> </div>
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
                <title>Book profile</title>
            </Head>
            <div className={styles.container}>
                <div>
                    <h1>Data profile</h1>
                    {showInfo()}
                    
                </div>
            </div>
        </Layout>
    )
}
export default showdata

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
