import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import config from '../config/config'

const URL = `http://localhost/api/students`

const fetcher = url => axios.get(url).then(res => res.data)

const SWR1 = ({token}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/books`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

   
}
export default withAuth(SWR1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}