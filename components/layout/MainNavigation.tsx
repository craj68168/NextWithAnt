import classes from "./MainNavigation.module.css";
import Link from "next/link";
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context/AuthContext"
import { Router, useRouter } from "../../node_modules/next/router";
const theme = {
  colors: {
    header: "green",
    body: "black"
  }
}
const Header = styled.header`  
width: 100%; 
height: 5rem; 
display: flex;
align-items: center;
justify-content: space-between;
background-color: #77002e; 
padding: 0 10%;
 ul {
  list-style: none; 
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline; 
}
li {
  margin-left: 3rem; 
}
 a {
  text-decoration: none;
  font-size: 1.3rem;
  color: #fcb8d2;
}
& a:hover,
& a:active,
& a.active {
  color: white;  
}
`
const LogoDiv = styled.div`
font-size: 1.3rem;
color: white;
font-weight: bold;   
`
const MainNavigation = () => {
  const { user, logout } = AuthContextProvider();
  const router = useRouter()

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>React Meetups</div>
        <nav>
          <ul>
            {user ? <> <li>
              <Link href="/dashboard">All Meetups</Link>
            </li>
              <li>
                <Link href="/new-meetup">Add New Meetup</Link>
              </li>
              <li> <a  onClick={() => {
               
               logout();
               router.push("/login")

              }}>Logout</a></li>
            </> : <> <li>
              <Link href="/login">Login</Link>
            </li>
              <li> <Link href="/signup">Signup</Link></li>
              </>}


          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainNavigation;
