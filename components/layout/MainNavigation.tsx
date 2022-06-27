// import classes from "./MainNavigation.module.css";
import Link from "next/link";
import styled from "styled-components"
const Header = styled.header`
width: 100%;
height: 5rem;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #77002e;
padding: 0 10%;
& ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;
}
& li {
  margin-left: 3rem;
}
& a {
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
function MainNavigation() {
  return (
    <Header >
      <LogoDiv >React Meetups</LogoDiv>
      <nav>
        <ul>
          <li> 
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link href="/hubble">Hubble</Link>
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default MainNavigation;
