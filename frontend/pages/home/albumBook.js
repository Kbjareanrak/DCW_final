import styles from '../../styles/Home.module.css';
import React from 'react'

export default function AlbumBook() {      
    return (
        <div className={styles.front}>
        <div className={styles.galleryRow}>
        <div className={styles.gallery}>
           <div className={styles.sizePicBook}>
                <img src="http://cg.lnwfile.com/o8yweh.jpg" alt="Cinque Terre"></img>
            </div> 
            <div className={styles.desc}> หนังสือเล่มที่ 1<br/>
                ประเภท : Suspense <br/>
                ราคา :  150 บาท</div>
        </div>
        
        <div className={styles.gallery}>
        <div className={styles.sizePicBook}>
            <img src="http://a.lnwfile.com/9l6cjr.jpg" alt="Cinque Terre"></img>
        </div>
        <div className={styles.desc}> หนังสือเล่มที่ 2<br/>
                ประเภท : Suspense <br/>
                ราคา :  160 บาท</div>
        </div>

        <div className={styles.gallery}>
           <div className={styles.sizePicBook}>
            <img src="https://images-se-ed.com/ws/Storage/Originals/978974/475/9789744751843L.gif?h=e1a0f9f82f80f4ebbed203bd5f407428" alt="Cinque Terre"></img>
            </div> 
            <div className={styles.desc}> หนังสือเล่มที่ 3<br/>
                ประเภท : Suspense <br/>
                ราคา :  170 บาท</div>
        </div>

    </div>
    </div>
    );
  }