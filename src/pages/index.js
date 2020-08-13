import React, { Fragment } from 'react'
import Layout from '../components/layout'
import hero from '../images/long-main.png'
import advSq from '../images/adv-square.jpg'
import advSq2 from '../images/advanced-square.jpg'
import beginSq from '../images/beginner-square.jpg'
import styled from 'styled-components'
import Head from '../components/head'
import { Link } from 'gatsby'



const Hero = styled.img`
box-shadow: 3px 3px 3px lightgray;
width: 100%;
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

const CardsContainer = styled.div`
padding: 4em;
background-color: #f4fffb;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: 4em;

`

const SingleCard = styled.div`
display: grid;
max-width:400px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 5px;
background-color: white;
&:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    cursor: pointer;
}
`

const CardImageContainer = styled.div`
grid-column-start: 1;
grid-column-end: 3;
justify-content: stretch;

`
const CardImage = styled.img`
grid-column-start: 1;
grid-column-end: 3;
border-radius: 5px 5px 0 0;
max-width:400px !important;
height: auto;
`

const CardBody = styled.div` 
grid-column-start: 1;
grid-column-end: 3;
justify-content: center;
padding: 20px;
`
const LinkBox = styled.div`
float: right;
`
const CardTitle = styled.h3`
grid-row-start: 1;
grid-column-start: 1;
grid-column-end: 3;
justify-self: center;
font-size: 20px;
margin-bottom: 2em;
`
const CardInfo = styled.p`
font-size: 18px;
`

const LandingPage = () => (
    <Fragment>
        <Head title="Agiro yoga studio" />
        <Hero src={hero} alt='hero' />
        <CardsContainer>

            <SingleCard>
                <CardImageContainer>
                    <CardImage src={advSq} alt="advanced-square" />
                </CardImageContainer>
                <CardBody >
                    <CardTitle>Yoga beginners</CardTitle>
                    <CardInfo>2 hours </CardInfo>
                    <strong><CardInfo>On Mondays at 20.00</CardInfo></strong>
                    <LinkBox>
                        <Link to="/courses">Learn more</Link>
                    </LinkBox>

                </CardBody>
            </SingleCard>

            <SingleCard>
                <CardImageContainer>
                    <CardImage src={advSq2} alt="advanced-square2" />
                </CardImageContainer>
                <CardBody >
                    <CardTitle>Yoga advanced</CardTitle>
                    <CardInfo>2 hours </CardInfo>
                    <strong><CardInfo>On Tuesdays at 20.00</CardInfo></strong>
                    <LinkBox>
                        <Link to="/courses">Learn more</Link>
                    </LinkBox>
                </CardBody>
            </SingleCard>

            <SingleCard>
                <CardImageContainer>
                    <CardImage src={beginSq} alt="beginner-square" />
                </CardImageContainer>
                <CardBody >
                    <CardTitle>Stretching</CardTitle>
                    <CardInfo>1.5 hours </CardInfo>
                    <strong><CardInfo>On Thursdays at 16.00</CardInfo></strong>
                    <LinkBox>
                        <Link to="/courses">Learn more</Link>
                    </LinkBox>
                </CardBody>
            </SingleCard>

        </CardsContainer>
    </Fragment >
);

export default () => (
    <Layout>

        <LandingPage />
    </Layout>
);

