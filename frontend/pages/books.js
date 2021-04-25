import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import Layout from '../components/layout'
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import config from '../config/config'

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
   const [bookName, setBookName] = useState('')

   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
   // console.log(data)

   const printBooks = (books) => {
       console.log('Books:', books)
       if (books && books.length)
           return (books.map((book, index) =>
           (<li key={index}>
               {(book) ? book.bookName : '-'}
               <button onClick={() => deleteBook(book.id)}> Delete </button>
               <button onClick={() => updateBook(book.id)}>Update</button>
           </li>)
           ))
       else {
           return (<h2>No Students</h2>)
       }
   }

   const getBook = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('book id: ', result.data)
       setBook(result.data)
   }

   const addBook = async (bookName) => {
       const result = await axios.post(URL, { bookName })
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
           bookName
       })
       console.log('Book id update: ', result.data)
       mutate(URL)
   }

   return (
     <Layout>
         <Navbar/>
       <div>
       <h1> Books</h1>
       <ul>{printBooks(data.list)}</ul> <br/>
       {JSON.stringify(user)}

       selected book: {book.bookName}
       <h2>Add book</h2>
          book Name:<input type="text" onChange={(e) => setBookName(e.target.value)} /><br/>
       <button onClick={() => addBook(bookName)}>Add new book</button>

      </div>
    </Layout>
   )
}
export default withAuth(SWR1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}