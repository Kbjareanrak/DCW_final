import Head from 'next/head' 
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Slideshow from './home/picHome'
import AlbumBook from './home/albumBook'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Map = ({ token }) => {
  return (
    <Layout>
    <Head>
        <title>Map</title>
        <script async defer
            src="https://maps.googleapis.com/maps/api/js">
        </script>
    </Head>
    <div id='main' style='width:100; height:400px; '></div>
        <script>
            var first = null
            function start(){ 
                var main = document.getElementById('main')
                var data = { zoom: 7, center: {lat:14, lng:100}}
                first = new google.maps.Map(main, data)
                new google.maps.Marker({map: first, position:{lat:13.755824,lng:100.567428 }})
            }
        </script>
      
    </Layout>
  )
} 
export default Map;

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}