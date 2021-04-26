import styles from '../../styles/Home.module.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'


const URL = `http://localhost/api/dataBooks`

const fetcher = url => axios.get(url).then(res => res.data)

export default function AlbumBook() { 

    const { data } = useSWR(URL, fetcher)
    const [book, setBook] = useState('')

   if (!data) return <div>Loading...</div>
   // console.log(data)


    const showBooks = (dataBooks) => {
        console.log('Students:', dataBooks)
        if (dataBooks && dataBooks.length)
            return (dataBooks.map((book, index) =>
            (<div key={index}>
                {/* {(book) ? book.bookName : '-'} {(book) ? book.typeBook : '-'}
                {(book) ? book.price : '-'} {(book) ? book.pic : '-'}
                {(book) ? book.idBook : '-'} */}
                <div className={styles.gallery}>
                    <div className={styles.sizePicBook}>
                        <img src={book.pic} alt="Cinque Terre"></img>
                    </div> 
                    <div className={styles.desc}> 
                        {book.bookName}<br/>
                        ประเภท : {book.typeBook} <br/>
                        ราคา :  {book.price} บาท<br/>
                        Id : {book.idBook}
                    </div>
                </div>
            </div>
                )
            ))
        else {
            return (<h2>No Books</h2>)
        }
    }

    return (
    <div>
        <div className={styles.front}>
            <div className={styles.galleryRow}>
                {showBooks(data.list)}<br/>
            </div>
        </div>
     </div>
    );
  }