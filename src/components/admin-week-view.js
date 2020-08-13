import React from 'react'
import { withFirebase } from '../services'
import moment from 'moment'
import styled from 'styled-components'

const AllWeeksContainer = styled.div`
display: grid;
grid-template-columns: 7% auto 7%;
background-color: #f4fffb;
`

const Title = styled.h3`
 grid-column: 2;
 text-align: center;
`

const BookingList = styled.ul`
margin: 1em;
 grid-column: 2;
 font-size: 20px;
 `
const ListWeekElement = styled.li`
font-size: 20px;
margin: 1em;
list-style: none;
 `
const ListUserElement = styled.li`
font-size: 20px;
margin: 1em;
 `

class WeekView extends React.Component {
    constructor(props) {
        super(props)
    }


    lessonsOnCurrentWeek = () => {
        return this.props.lessons
            .filter(l => {
                return (l.startWeek <= this.props.week) && (l.endWeek >= this.props.week)
            })
            // if a - b negative then it will sort b a. you need diff between them
            .sort((a, b) => a.weekday - b.weekday)
            .map(l => {
                const weekdayName = moment().week(this.props.week).weekday(l.weekday).format('dddd')
                return (
                    <ListWeekElement key={l.id}>
                        <span>
                            {l.name} {weekdayName} {l.time}
                        </span>
                        <div><ul>{this.renderStudents(l, this.props.week)}</ul></div>
                    </ListWeekElement>
                )
            })
    }

    renderStudents = (lesson, week) => {
        const bookingsOnCertainLessonOnCertainWeek = this.props.bookings
            // first filter is to filter bookings by lesson id
            .filter(b => b.lessonId === lesson.id)
            //second filter to filter bookings by specific week
            .filter(b => moment(b.lessonDate.toDate()).week() === week)
        //user now will hold bookings with users objects together
        const users = bookingsOnCertainLessonOnCertainWeek.map(b => {
            //do some join, find the right user and put it into a booking

            const user = this.props.users.find(user => user.id === b.userId)

            return { ...b, user }
        })
            .filter(b => !!b.user)

        return users.map(b => {
            //you need more unique key, but booking id is pretty fine
            return (<ListUserElement key={b.id}>{b.user.username}, {b.user.email}, status: {b.status}</ListUserElement>)
        })
    }

    render() {
        return (
            <AllWeeksContainer>
                <Title>Week {this.props.week} lessons</Title>
                <BookingList>
                    {this.lessonsOnCurrentWeek()}
                </BookingList>
            </AllWeeksContainer>
        )
    }





}

export default withFirebase(WeekView)