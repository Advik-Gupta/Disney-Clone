import React, { useEffect, useState }  from 'react';
import styled from 'styled-components'
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Movies from './Movies';
import db from '../firebase';
// import { print } from '@advikguptadev/basic-function';


function Home() {

  const [movies, setmovies] = useState([])

  useEffect(() => {
		db.collection("movies").onSnapshot((snapshot) => {
      let tempMovies = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
      setmovies(tempMovies)
    })
	}, []); 

  return (
    <Container>
        <ImgSlider />
        <Viewers />
        <Movies movies={movies} />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  padding: 0 calc(3.5vw + 5px);
  min-height: calc(100vh - 70px);
  height: fit-content;
  padding-bottom: 40px;
  position: relative;
  overflow-x: hidden;
  margin-top: 70px;

  &:before {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    background-position: center;
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`