import React, { Fragment } from 'react'
import Layout from '../components/layout'
import Head from '../components/head'
import styled from 'styled-components'
import advlong from '../images/adv-long2.jpg'
import beginlong from '../images/beginner-long.jpg'
import stretchlong from '../images/main-long.jpg'

const PageContainer = styled.div`
background-color: #f4fffb;
display: grid;
grid-template-columns: 5em auto 5em;
grid-template-rows: 1 1 1 1 1 1 1 1;
grid-column-gap: 1em;
grid-row-gap: 3em;
font-size: 18px;
text-align: center;
`
const Title = styled.h3`
justify-content: center;
`
const LongImage1 = styled.img`
grid-column-start: 1;
grid-column-end:4;
grid-row: 1;
box-shadow: 3px 3px 3px lightgray;
width: 100%;
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
margin: 0 1em o 1em;
`
const LongImage2 = styled.img`
grid-column-start: 1;
grid-column-end:4;
grid-row: 3;
box-shadow: 3px 3px 3px lightgray;
width: 100%;
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
margin: 0 1em o 1em;
`
const LongImage3 = styled.img`
grid-column-start: 1;
grid-column-end: 4;
grid-row: 5;
box-shadow: 3px 3px 3px lightgray;
width: 100%;
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
margin: 0 1em o 1em;
`
const CourseTextInfo1 = styled.div`
grid-row: 2;
grid-column-start: 2;
grid-column-end: 3;
justify-self: center;
`
const CourseTextInfo2 = styled.div`
grid-row: 4;
grid-column-start: 2;
grid-column-end: 3;
justify-self: center;
`
const CourseTextInfo3 = styled.div`
grid-row: 6;
grid-column-start: 2;
grid-column-end: 3;
justify-self: center;
`
const CallToActionButton = styled.button`
display: block;
text-decoration: none;
text-align: center;
font-size: 1em;
padding: 0.25em 1em;
border-radius: 12px;
grid-row: 7;
grid-column: 2;
width: 12em;
justify-self: center;
margin-bottom: 2em;
font-size: 20px;
color: white;
background-color: #b66eba;
outline: none;
&:hover {
    background-color: #e768b5;
     cursor: pointer;
    }
`

const Courses = () => {
  return (
    <Fragment>
      <PageContainer>
        <LongImage1 src={advlong} alt="adv course" />

        <CourseTextInfo1>
          <Title>
            Yoga for beginners
                    </Title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non cursus risus. Sed ultricies mi vitae gravida rhoncus. Praesent id lorem faucibus, egestas dui vitae, pretium eros. Cras luctus risus sapien, sit amet placerat eros sodales finibus. Pellentesque vel massa ac massa condimentum sodales ac vel ipsum. Donec pellentesque sit amet justo a tempus. Vivamus mi ligula, viverra sed tincidunt pretium, imperdiet id leo. Curabitur a feugiat lorem, at bibendum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ultricies lectus id neque vulputate varius. Nulla facilisi. Quisque porttitor fringilla fermentum.
            Fusce at enim rutrum, euismod erat at, porta enim. Proin commodo lectus non velit congue, sit amet tempus odio egestas. Sed rutrum aliquet diam, eget sodales leo. Etiam leo odio, pharetra a facilisis eget, elementum et elit. Duis nisi neque, rutrum commodo augue quis, laoreet convallis massa. Sed vestibulum ultricies tempus. Nunc tristique ornare laoreet. Donec vitae leo vel nibh ullamcorper dictum quis sit amet nisi. Morbi varius semper magna, posuere pellentesque mauris aliquet eu.
            </CourseTextInfo1>
        <LongImage2 src={beginlong} alt="beginner course" />
        <CourseTextInfo2>
          <Title>
            Advanced yoga
                    </Title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non cursus risus. Sed ultricies mi vitae gravida rhoncus. Praesent id lorem faucibus, egestas dui vitae, pretium eros. Cras luctus risus sapien, sit amet placerat eros sodales finibus. Pellentesque vel massa ac massa condimentum sodales ac vel ipsum. Donec pellentesque sit amet justo a tempus. Vivamus mi ligula, viverra sed tincidunt pretium, imperdiet id leo. Curabitur a feugiat lorem, at bibendum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ultricies lectus id neque vulputate varius. Nulla facilisi. Quisque porttitor fringilla fermentum.
            Fusce at enim rutrum, euismod erat at, porta enim. Proin commodo lectus non velit congue, sit amet tempus odio egestas. Sed rutrum aliquet diam, eget sodales leo. Etiam leo odio, pharetra a facilisis eget, elementum et elit. Duis nisi neque, rutrum commodo augue quis, laoreet convallis massa. Sed vestibulum ultricies tempus. Nunc tristique ornare laoreet. Donec vitae leo vel nibh ullamcorper dictum quis sit amet nisi. Morbi varius semper magna, posuere pellentesque mauris aliquet eu.
            </CourseTextInfo2>
        <LongImage3 src={stretchlong} alt="stretch course" />
        <CourseTextInfo3>
          <Title>
            Stretch
                    </Title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non cursus risus. Sed ultricies mi vitae gravida rhoncus. Praesent id lorem faucibus, egestas dui vitae, pretium eros. Cras luctus risus sapien, sit amet placerat eros sodales finibus. Pellentesque vel massa ac massa condimentum sodales ac vel ipsum. Donec pellentesque sit amet justo a tempus. Vivamus mi ligula, viverra sed tincidunt pretium, imperdiet id leo. Curabitur a feugiat lorem, at bibendum magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ultricies lectus id neque vulputate varius. Nulla facilisi. Quisque porttitor fringilla fermentum.
            Fusce at enim rutrum, euismod erat at, porta enim. Proin commodo lectus non velit congue, sit amet tempus odio egestas. Sed rutrum aliquet diam, eget sodales leo. Etiam leo odio, pharetra a facilisis eget, elementum et elit. Duis nisi neque, rutrum commodo augue quis, laoreet convallis massa. Sed vestibulum ultricies tempus. Nunc tristique ornare laoreet. Donec vitae leo vel nibh ullamcorper dictum quis sit amet nisi. Morbi varius semper magna, posuere pellentesque mauris aliquet eu.
            </CourseTextInfo3>

        <CallToActionButton as="a" href="/schedule">
          Book a lesson
                </CallToActionButton>


      </PageContainer>
    </Fragment>
  )
}

export default () => (
  <Layout>
    <Head title="Our courses" />
    <Courses />
  </Layout>
);