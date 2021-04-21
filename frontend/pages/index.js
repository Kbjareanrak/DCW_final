import Head from 'next/head' 
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import NavbarHome from '../components/navbarhome'

export default function Home({ token }) {

  return (
    <Layout>
    <Head>
        <title>BOR Shop</title>
    </Head>

     {/* Headder */}
    <div className ={styles.navbarRight}>
          <NavbarHome />
    </div>
    <div className= {styles.header}>
        <h1 className = {styles.front}>BOR SHOP</h1>
    </div>
    
    {/* Body */}
    <div className= {styles.position1}>
      Body1
    </div>
    <div className= {styles.position2}>
      Body2
    </div>

    {/* Footer */}
    <div className= {styles.footer}>
      Footer
    </div>

    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
