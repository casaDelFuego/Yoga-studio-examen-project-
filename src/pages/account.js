import React, { Fragment } from 'react'

import Layout from '../components/layout'
import {
    AuthUserContext,
    withAuthorization, //already uses withFirebase
} from '../components/Session'
import moment from 'moment'
import Head from '../components/head'
import styled from 'styled-components'


const PageContainer = styled.div`
display: grid;
grid-template-columns: 8em auto 8em;
grid-column: 2;
justify-self: center;
 `
const UsernameTitle = styled.h1`
 grid-column: 2;
 text-align: center;
 `

const SecondaryTitle = styled.h3`
 text-align: left;
 grid-column: 2;
 font-size: 24px;
 margin-bottom: 2em;
`

const BookingList = styled.ul`
margin: 3em;
 grid-column: 2;
 `
const ListElement = styled.li`
font-size: 20px;
margin: 1em;
list-style: none;
 `


const CancelButton = styled.button`
float: right;
font-size: 18px;
background-color: #7baecb;
width: 8em;
height: 2em;
border-radius: 10px;
&:hover{
    cursor: pointer;
    background-color: #461148;
    color: white;
}
`
const Message = styled.h4`
grid-column: 2;
text-align: center;
font-size: 24px;
margin: 3em;

`



class AccountPageBase extends React.Component {
    _hasFetched = false

    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            lessons: [],
            message: ''
        }

    }

    fetchUsersBookingsAndUpdateState = (authUser, override = false) => {
        if (!override && (this._hasFetched || !this.props.firebase)) {
            return
        }
        this._hasFetched = true
        let bookings = []
        this.props.firebase.getRefOfBookingsByUser(authUser.uid)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => bookings.push({
                    id: doc.id,
                    ...doc.data()
                }))

                return bookings
            })
            // now fetch lessons for each booking
            .then(bookings => {
                const lessonPromises = bookings.map(b => {
                    return this.props.firebase.lesson(b.lessonId)
                        .get()
                })
                return Promise.all(lessonPromises)
            })
            .then(snapshots => {
                const lessons = []
                snapshots.forEach(snap => lessons.push({
                    id: snap.id,
                    ...snap.data()
                }))
                this.setState({
                    lessons: lessons,
                    bookings: bookings
                })

            })
            .catch(err => {
                console.log('Error getting bookings by user id', err)
            })
    }


    cancelBooking = (bookingId, lessonName) => {
        const booking = this.state.bookings.find(b => b.id === bookingId)
        this.props.firebase.changeBookingStatus(booking, "cancelled")
            .then(() => this.setState({ message: `Your booking of ${lessonName} has been cancelled` }))
            .then(() => this.fetchUsersBookingsAndUpdateState(this.props.firebase.currentUser(), true))
            .catch(err => {
                console.log('Error updating list', err)
            })

    }

    render() {
        const bookings = this.state.bookings.map(b => {
            if (b.status === 'cancelled') {
                return null
            }
            const lesson = this.state.lessons.find(l => {
                return b.lessonId === l.id
            })
            const date = moment(b.lessonDate.toDate())
            if (b.lessonDate.seconds > (new Date().getTime() / 1000 - 172800)) {
                return (<ListElement key={b.id} className={b.status}>
                    <strong>{lesson.name}</strong> on {date.format("dddd, MMMM Do YYYY, HH:mm")}
                    <CancelButton onClick={this.cancelBooking.bind(this, b.id, lesson.name)}>Cancel</CancelButton>
                </ListElement>)
            }
        })


        return (<Fragment>
            <AuthUserContext.Consumer>
                {authUser => (
                    <PageContainer>
                        {this.fetchUsersBookingsAndUpdateState(authUser)}
                        <UsernameTitle>Hello, {authUser.username}!</UsernameTitle>
                        <BookingList>
                            <SecondaryTitle>Your upcoming lessons</SecondaryTitle>
                            {bookings}

                        </BookingList>
                        <Message>{this.state.message}</Message>
                    </PageContainer>
                )}
            </AuthUserContext.Consumer>
        </Fragment>
        )
    }


}
const condition = authUser => !!authUser;

const AccountPage = withAuthorization(condition)(AccountPageBase)

export default () => (
    <Layout>
        <Head title="Account" />
        <AccountPage />
    </Layout>
);
