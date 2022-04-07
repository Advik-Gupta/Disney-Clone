import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import db from '../firebase';

function Detail() {
    const {id} = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {
		let movie = db.collection("movies").doc(id);  
        movie.get().then(data => {
            if (data.exists) {
                setMovie(data.data())
            } else {
                alert('Movie does not exist')
            }
        })
	}, []);

    console.log(movie)
    
    return (
        <Container>
            <Background>
                <img src={movie.backgroundImg} alt="" />
            </Background>
            <ImageTitle>
                <img src={movie.titleImg} alt="" />
            </ImageTitle>
            <Controls>
                <PlayButton>
                    <img src="/images/play-icon-black.png" alt="" />
                    <span>PLAY</span>
                </PlayButton>
                <TrailerButton>
                    <img src="/images/play-icon-white.png" alt="" />
                    <span>Trailer</span>
                </TrailerButton>
                <AddButton>
                    <span>+</span>
                </AddButton>
                <GroupWatchButton>
                    <img src="/images/group-icon.png" alt="" />
                </GroupWatchButton>
            </Controls>
            <SubTitle>
                {movie.subTitle}
            </SubTitle>
            <Description>
                {movie.description}
            </Description>
        </Container>
    )
}

export default Detail;

const Container = styled.div`
    padding: 0 calc(3.5vw + 5px);
    min-height: calc(100vh - 70px);
    position: relative;
    overflow: hidden;
    margin-top: 70px;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 40px;
    margin-top: 40px;

    img {
        width: fit-content;
        height: 100%;
        object-fit: contain;
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`

const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background-color: rgb(249,249,249);
    border: none;
    padding: 0px 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background-color: rgb(198,198,198);
    }
`

const TrailerButton = styled(PlayButton)`
    background-color: rgb(0,0,0, 0.3);
    border: 1px solid rgba(249, 249, 249);
    color: rgba(249, 249, 249);
    text-transform: uppercase;
`

const AddButton = styled.button`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;
    margin-right: 16px;

    span {
        font-size: 30px;
        color: white;
    }
`

const GroupWatchButton = styled(AddButton)`
    background-color: black;
`

const SubTitle = styled.div`
    color: rgb(249,249,249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    color: rgb(249,249,249);
    font-size: 20px;
    margin-top: 16px;
    line-height: 1.4;
    max-width: 700px;
`