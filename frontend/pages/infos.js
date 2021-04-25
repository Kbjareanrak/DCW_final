import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import config from '../config/config'

const URL = `http://localhost/api/infos`

const fetcher = url => axios.get(url).then(res => res.data)

const SWR1 = ({token}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/infos`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

   const [info, setInfo] = useState('')
   const [name, setName] = useState('')
   const [phone, setPhone] = useState(0)
   const [day, setDay] = useState('')

   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
   // console.log(data)

   const printInfos = (infos) => {
       console.log('Books:', infos)
       if (infos && infos.length)
           return (infos.map((info, index) =>
           (<li key={index}>
               {(info) ? info.name : '-'}: {(info) ? info.phone : 0}: {(info) ? info.day : '-'}
               <button onClick={() => deleteInfo(info.id)}> Delete </button>
               <button onClick={() => updateInfo(info.id)}>Update</button>
           </li>)
           ))
       else {
           return (<h2>No Data</h2>)
       }
   }

   const getInfo = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('Data id: ', result.data)
       setInfo(result.data)
   }

   const addInfo = async (name, phone, day) => {
       const result = await axios.post(URL, { name, phone, day })
       console.log(result.data)
       mutate(URL)
   }

   const deleteInfo = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       console.log(result.data)
       mutate(URL)
   }
    const updateInfo = async (id) => {
       const result = await axios.put(`${URL}/${id}`,{
            name, 
            phone, 
            day
       })
       console.log('Data id update: ', result.data)
       mutate(URL)
   }

   return (
     <Layout>
         <Navbar/>
       <div>
       <h1> Datas</h1>
       <ul>{printInfos(data.list)}</ul> <br/>
       {JSON.stringify(user)}

       selected Data: {info.name} {info.phone} {info.day}
       <h2>Add Data</h2>
           Name:<input type="text" onChange={(e) => setName(e.target.value)} /><br/>
           phone:<input type="number" onChange={(e) => setPhone(e.target.value)} /><br/>
           Day:<input type="text" onChange={(e) => setDay(e.target.value)} /><br/>
       <button onClick={() => addInfo(name, phone, day)}>Add Data</button>

      </div>
    </Layout>
   )
}
export default withAuth(SWR1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}