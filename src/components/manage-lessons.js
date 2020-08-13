import React from 'react'
import { withFirebase } from '../services'
import WeekView from '../components/admin-week-view'
import styled from 'styled-components'

const AllLessonContainer = styled.div`
display: grid;
grid-template-columns: 7% auto 7%;
background-color: #f4fffb;
margin-bottom: 4em;
`

const Title = styled.h2`
 grid-column: 2;
 text-align: center;
`
const WeekDisplay = styled.div`
 grid-column: 2;
 text-align: left;
`

class LessonsManager extends React.Component {
    //we need different locks for each operation
    _hasFetchedUsers = false
    _hasFetchedBookings = false
    _hasFetchedLessons = false

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            bookings: [],
            lessons: []
        }
    }

    fetchAllExistingLessons = () => {
        if (this._hasFetchedLessons || !this.props.firebase) {
            return
        }
        this._hasFetchedLessons = true

        return this.props.firebase.lessons().get().then(snapshot => {
            const lessonsList = []
            snapshot.forEach(doc => lessonsList.push({
                //firebase doesn't have id inside of the object,
                //in order to use id as a key prop add it manually
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ lessons: lessonsList })
        })
            .catch(err => {
                console.log('error getting lessons', err)
            })
    }

    fetchAllExistingBookings = () => {
        if (this._hasFetchedBookings || !this.props.firebase) {
            return
        }
        this._hasFetchedBookings = true

        return this.props.firebase.bookings().get().then(snapshot => {
            const bookingsList = []
            snapshot.forEach(doc => bookingsList.push({

                id: doc.id,
                ...doc.data()
            }))

            this.setState({
                bookings: bookingsList
            })
        })
            .catch(err => {
                console.log('error getting bookings', err)
            })
    }

    fetchAllExistingUsers = () => {
        if (this._hasFetchedUsers || !this.props.firebase) {
            return
        }
        this._hasFetchedUsers = true
        return this.props.firebase.users().get().then(snapshot => {

            const usersList = []
            snapshot.forEach(doc => usersList.push({

                id: doc.id,
                ...doc.data()
            }))
            this.setState({ users: usersList })

        })
            .catch(err => {
                console.log('error getting users', err)
            })
    }

    render() {

        this.fetchAllExistingBookings()
        this.fetchAllExistingLessons()
        this.fetchAllExistingUsers()

        const allWeeks = []

        for (let i = 8; i < 52; i++) {
            allWeeks.push(<section key={i}>
                <WeekView week={i}
                    lessons={this.state.lessons}
                    bookings={this.state.bookings}
                    users={this.state.users} />
            </section>)
        }

        return (
            <AllLessonContainer>
                <Title>All booked lessons</Title>
                <WeekDisplay>{allWeeks}</WeekDisplay>
            </AllLessonContainer>
        )
    }


}

export default withFirebase(LessonsManager)
