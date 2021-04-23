import React from 'react';
import styles from '../../styles/Home.module.css';

export default function AlbumBook() {
    return (
    <div className={styles.galleryRow}>
        <div className={styles.gallery}>
           <div className={styles.sizePicBook}>
                <img src="http://cg.lnwfile.com/o8yweh.jpg" alt="Cinque Terre"></img>
            </div> 
            <div className={styles.desc}>Add a description of the image here</div>
        </div>
        
        <div className={styles.gallery}>
        <div className={styles.sizePicBook}>
            <img src="http://a.lnwfile.com/9l6cjr.jpg" alt="Cinque Terre"></img>
        </div>
        <div className={styles.desc}>Add a description of the image here</div>
        </div>

        <div className={styles.gallery}>
           <div className={styles.sizePicBook}>
            <img src="https://images-se-ed.com/ws/Storage/Originals/978974/475/9789744751843L.gif?h=e1a0f9f82f80f4ebbed203bd5f407428" alt="Cinque Terre"></img>
            </div> 
            <div className={styles.desc}>Add a description of the image here</div>
        </div>

    </div>
    );
  }