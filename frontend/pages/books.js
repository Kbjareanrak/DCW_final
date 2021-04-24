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

    const fadeImages = [
        "http://cg.lnwfile.com/o8yweh.jpg",
        "http://a.lnwfile.com/9l6cjr.jpg",
        "https://images-se-ed.com/ws/Storage/Originals/978974/475/9789744751843L.gif?h=e1a0f9f82f80f4ebbed203bd5f407428"
    ];

   const [book, setBook] = useState('')
   const [name, setName] = useState('')
   const [typeBook, setTypeBook] = useState('')
   const [price, setPrice] = useState(0)
   const [pic, setPic] = useState('')

   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
   // console.log(data)

   const printBooks = (books) => {
       console.log('Books:', books)
       if (books && books.length)
           return (books.map((book, index) =>
           (<li key={index}>
               <div>{(book) ? book.name : '-'}<br/>
               ประเภทหนังสือ : {(book) ? book.typeBook : '-'} <br/>
               ราคา : {(book) ? book.price : 0} บาท
               </div>
               <button onClick={() => deleteBook(book.id)}> Delete </button>
               <button onClick={() => getBook(book.id)}>Get</button>
               <button onClick={() => updateBook(book.id)}>Update</button>
           </li>)
           ))
       else {
           return (<h2>No Books</h2>)
       }
   }

   const selectBooks = (books) => {
    console.log('Books:', books)
    if (books && books.length)
        return (books.map((book, index) =>
        (<li key={index}>
            <div className={styles.gallery}>
                <div className={styles.sizePicBook}>
                    <img src={book.pic} alt="Cinque Terre"></img>
                </div>
            </div>
            <div className={styles.desc}>{(book) ? book.name : '-'}<br/>
            ประเภทหนังสือ : {(book) ? book.typeBook : '-'} <br/>
            ราคา : {(book) ? book.price : 0} บาท
            
            <button onClick={() => deleteBook(book.id)}> Delete </button>
            <button onClick={() => getBook(book.id)}>Get</button>
            <button onClick={() => updateBook(book.id)}>Update</button>
    </div>    
    </li>)
        ))
    else {
        return (<h2>No Books</h2>)
    }
}

   const getBook = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('book id: ', result.data)
       setBook(result.data)
   }

   const addBook = async (name, typeBook, price) => {
       const result = await axios.post(URL, { name, typeBook, price})
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
           name,
           typeBook,
           price
       })
       console.log('Book id update: ', result.data)
       mutate(URL)
   }

   return (
     <Layout>
         <Navbar/>
       <div>
       <h1> Book</h1>
       <ul>{selectBooks(data.list)}</ul> <br/>
       {JSON.stringify(user)}

       selected Book: {book.name} {book.typeBook} {book.price}
       <h2>Add Book</h2>
          Name:<input type="text" onChange={(e) => setName(e.target.value)} /><br/>
          Type:<input type="text" onChange={(e) => setTypeBook(e.target.value)} /><br/>
          Price:<input type="text" onChange={(e) => setPrice(e.target.value)} /><br/>
       <button onClick={() => addBook(name, typeBook,price)}>Add new Book</button>

      </div>
    </Layout>

   )
}
export default SWR1

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}