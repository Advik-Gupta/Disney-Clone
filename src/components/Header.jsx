import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from '../firebase';

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(result => {
      let user = result.user
      dispatch(setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }))
      navigate('/home')
    })
  }

  const signOut = () => {
    auth.signOut()
    .then(() => {
      dispatch(setSignOutState())
      navigate('/login')
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        navigate("/home");
      }
    });
  }, []);

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {
        !userName ? 
        ( 
          <LoginContainer>
            <Login onClick={signIn}>Login</Login>
          </LoginContainer>
        ) :
        (
          <>
            <NavMenu>
              <a href='/home'>
                <img alt="" src="/images/home-icon.svg"/>
                <span>HOME</span>
              </a>
              <a href='/home'>
                <img alt="" src="/images/search-icon.svg"/>
                <span>SEARCH</span>
              </a>
              <a href='/home'>
                <img alt="" src="/images/watchlist-icon.svg"/>
                <span>WATCHLIST</span>
              </a>
              <a href='/home'>
                <img alt="" src="/images/original-icon.svg"/>
                <span>ORIGINALS</span>
              </a>
              <a href='/home'>
                <img alt="" src="/images/movie-icon.svg"/>
                <span>MOVIES</span>
              </a>
              <a href='/home'>
                <img alt="" src="/images/series-icon.svg"/>
                <span>SERIES</span>
              </a>
            </NavMenu>
            <SignOut>
              <UserImg src={userPhoto} alt={userName} />
              <DropDown>
                <span onClick={signOut}>Sign out</span>
              </DropDown>
          </SignOut>
          </>
        )
      }
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 70px;
  background-color: rgb(9, 11, 19);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 26px;
  transition: opacity 0.5s ease-out 0s;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.img`
  padding: 0px;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  transition: all 0.2s ease 0s;
  font-size: 0px;
  display: inline-block;
`

const NavMenu = styled.div`
  -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin: 0px auto 0px 25px;
    padding: 0px;
    position: relative;

  a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 12px;
    cursor: pointer;
    margin-left: 5px;
    text-decoration: none;
    

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      margin-left: 8px;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        position: absolute;
        bottom: -6px;
        left: 0px;
        right: 0px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        /* 
        visibility: hidden;
        width: auto; */
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;  
        /* visibility: visible;
         */
      }
    }

  }
  `

// const UserImg = styled.img`
//   height: 48px;
//   width: 48px;
//   border-radius: 50%;
//   cursor: pointer;
// `;

const Login = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 350ms ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;


const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }

`;