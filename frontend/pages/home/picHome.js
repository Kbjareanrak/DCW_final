import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import styles from '../../styles/Home.module.css';


const fadeImages = [
    "http://cg.lnwfile.com/o8yweh.jpg",
    "http://a.lnwfile.com/9l6cjr.jpg",
    "https://images-se-ed.com/ws/Storage/Originals/978974/475/9789744751843L.gif?h=e1a0f9f82f80f4ebbed203bd5f407428"
];

export default function Slideshow() {
    return (
      <div className = {styles.sizePic}>
       <div className="slide-container">
        <Fade>
          <div className="each-fade">
            <img src={fadeImages[0]} />
            <h3 className={styles.frontbar}>Click</h3>
          </div>

          <div className="each-fade">
            <img src={fadeImages[1]} />
              <h3 className={styles.frontbar}>Click</h3>
          </div>
          <div className="each-fade">
            <img src={fadeImages[2]} />
              <h3 className={styles.frontbar}>Click</h3>
          </div>
        </Fade>
      </div>  
    </div> 
    );
  }