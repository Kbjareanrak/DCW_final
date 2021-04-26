import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbarName'
import styles from '../styles/Home.module.css'
import config from '../config/config'
import Album from './home/albumBook'

const URL = `http://localhost/api/books`
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

   const [book, setBook] = useState('')
   const [idBook, setidBook] = useState('')
   const [bookName, setnameBook] = useState('')

   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
   // console.log(data)

   const printBooks = (books) => {
       console.log('Books:', books)
       if (books && books.length)
           return (books.map((book, index) =>
           (<div key={index}>
                <div>Id name : {(book) ? book.idBook : '-'}</div>
                <div>Name Book : {(book) ? book.bookName : '-'}</div><br/>
                <div><button onClick={() => deleteBook(book.id)}> Delete </button>
                <button onClick={() => updateBook(book.id)}>Update</button></div>
                <br/>
                    {/* <button onClick={() => getBook(book.id)}>get book</button> */}
               
            </div>
             )
           ))
       else {
           return (<h2>No Students</h2>)
       }
   }

//    const getBook = async (idBook) => {
//        const result = await axios.get(`${URL}/${idBook}`)
//        console.log('get book data: ', result.data)
//        setBook(result.data)
//    }

   const addBook = async (idBook, bookName) => {
       const result = await axios.post(URL, {idBook, bookName})
       console.log(result.data)
       mutate(URL)
   }

   const deleteBook = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       console.log(result.data)
       mutate(URL)
   }
    const updateBook = async (id) => {
       const result = await axios.put(`${URL}/${id}`,{
           idBook,
           bookName
       })
       console.log('Book id update: ', result.data)
       mutate(URL)
   }

   return (
     <Layout>
         <div className = {styles.navbarRight}>
          <Navbar/>   
         </div>
         
         <div>
            <div>
                <div className = {styles.front}>
                    <h3 className={styles.toppicPad}><b>รายการหนังสือทั้งหมด</b></h3>
                </div>
                <div className= {styles.position2}>
                <Album/>
                </div>
            </div>

            <div className = {styles.front}>
                <div>
                    <h3 className={styles.toppicPad}><b>รายการเช่า</b></h3>
                </div>
                <div className = {styles.padBook}>
                <h3>รายชื่อหนังสือ</h3>
                {/* select book : {book.idBook} {book.bookName} 
                <br/> */}
                {printBooks(data.list)}
                </div>
                <div className={styles.padcontainer}>
                <div className={styles.border}>
                    <h3>เพิ่มหนังสือที่ต้องการ</h3>
                    <div className={styles.gridContainer}>
                        <div>ID name </div>
                        <div><input type="text" onChange={(e) => setidBook(e.target.value)} /></div>
                        <div>Book name</div>
                        <div> <input type="text" onChange={(e) => setnameBook(e.target.value)} /></div>
                        
                    </div>
                    <div><button onClick={() => addBook(idBook, bookName)}>Add new book</button>
                        <button><a href="/infos">Next</a></button></div>
                    </div>  
                </div>
            </div> 
         </div>
       
    </Layout>
   )
}
export default withAuth(SWR1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}