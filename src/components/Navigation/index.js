import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import logo from '../../images/logodreamcatcher.jpg'
import { AuthUserContext } from '../Session'
import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

const NavList = styled.ul`
display: flex;
list-style-type: none;
margin: o;
float: right;
padding-bottom: 1rem;
`

const NavLink = styled.li`
a {
    color: #666666;
    font-size: 1.2rem;
    margin-right: 1.3rem;
    text-decoration: none;
    &:hover {
     color: #e768b5;
     cursor: pointer;
    }
}

`
const Logo = styled.div`
margin-left: 1em;
display: inline-block;
margin: 0.5em;
align-content: center;
`

const Header = styled.div`
display: inline;
`

const LogoName = styled.span`
font-weight: bold;
font-size: 36px;
color: black;
font-family: 'Shrikhand';
`

const LogoDesc = styled.p`
font-family: 'Barlow', sans-serif;
color: #666666;
font-size: 16px;
`



const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Header>
    <Logo>
      <img src={logo} alt="logo" height="120" width="60" />
      <Logo>
        <LogoName>Agiro</LogoName><br />
        <LogoDesc>Yoga Studio</LogoDesc>
      </Logo>

    </Logo>

    <NavList>
      <NavLink>
        <Link to={ROUTES.LANDING}>Home</Link>
      </NavLink>
      <NavLink>
        <Link to={ROUTES.COURSES}>Courses</Link>
      </NavLink>
      <NavLink>
        <Link to={ROUTES.SCHEDULE}>Schedule</Link>
      </NavLink>
      <NavLink>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </NavLink>

      <NavLink>
        <a>
          <SignOutButton />
        </a>
      </NavLink>
    </NavList>
  </Header>
);

const NavigationNonAuth = () => (
  <Header>
    <Logo>
      <img src={logo} alt="logo" height="120" width="60" />
      <Logo>
        <LogoName>Agiro</LogoName><br />
        <LogoDesc>Yoga Studio</LogoDesc>
      </Logo>

    </Logo>

    <NavList>
      <NavLink>
        <Link to={ROUTES.LANDING}>Home</Link>
      </NavLink>
      <NavLink>
        <Link to={ROUTES.COURSES}>Courses</Link>
      </NavLink>
      <NavLink>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </NavLink>

    </NavList>
  </Header>
);

export default Navigation;
