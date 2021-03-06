import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbarLog";
import styles from "../styles/Home.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(`${config.URL}/login`,{ username, password, remember },{ withCredentials: true });
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } 
    catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const rememberMe = async () => {
    setRemember(!remember);
  };

  const loginForm = () => (
    <div className={styles.gridContainer}>

      <div><b>Username:</b></div>
      <div>
        <input type="text" name="username"  placeholder="username"  onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div><b>Password:</b></div>
      <div>
        <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      </div> 

      <div className="flex items-center">
        <input id="remember_me" name="remember_me" type="checkbox" onClick={rememberMe} />
      </div> 

      <div><label>Remember Me</label></div>
    </div>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={styles.bg}>
      <div className={styles.navbarRight}>
      <Navbar />
      </div>
      <div className={styles.front}>
                <div className={styles.container}>
                    <div className={styles.border}>
            <h1>Sign in</h1>
            <div>
              {/* <b>Token:</b> {token.substring(0, 15)}... */}
              {/* <button onClick={copyText}> Copy token </button> */}
            </div> 
            <br />
            <div>Status: {status}</div>
            <br />
            {loginForm()}
            <div>
              <button onClick={login}><a href="/home">Login</a></button>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}