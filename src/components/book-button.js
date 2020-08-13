import React from 'react'
import { withFirebase } from '../services'
import styled from 'styled-components'

const Book = styled.button`
outline: none;
background-color: #eb91ce;
padding: 0.8em;
width: auto;
height: auto;
font-size: 20px;
border-radius: 10px;
&:hover {
    cursor: pointer;
    background-color: #df3887;
    color: white;
}
`

const BookButton = (props) => {

    const bookLesson = () => {
        props.firebase.createBooking(props.lesson, props.selectedWeek)
            .then(() => props.triggerParentUpdate())
            .catch(err => console.error('failed booking, try again', err))
    }


    return <Book title="Book this lesson" onClick={bookLesson}>{props.lesson.time}</Book>


}

export default withFirebase(BookButton)