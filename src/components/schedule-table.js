import React from 'react'
import { withFirebase } from '../services'
import BookButton from './book-button'
import Head from '../components/head'
import styled from 'styled-components'

const TableContainer = styled.div`
display: grid;
grid-template-columns: 8em auto 8em;
`

const Table = styled.table`
padding: 1.5em;
background-color: rgb(168, 234, 233, 0.2);
grid-column: 2;
border-spacing: 0.5rem;
border-collapse: collapse;
font-size: 20px;

`
const TableTitle = styled.tbody`
text-align: center;
margin-top: 0.5em;
/*background-color: rgb(235, 145, 206, 0.4);*/
`

const TableClassCell = styled.td`
height: 6em;
width: 12em;
text-align: center;
border-collapse: collapse;
border-bottom: 1px solid lightgray;
border-right: 1px solid lightgray;
font-size: 20px;

`
const TableCell = styled.td`
height: 6em;
width: 12em;
text-align: center;
vertical-align: middle;
border-bottom: 1px solid lightgray;
border-right: 1px solid lightgray;

/*background-color: rgb(235, 145, 206, 0.2);*/
height: 2em;
`
const Message = styled.h4`
grid-column: 2;
text-align: center;
font-size: 24px;
margin: 3em;
color: #461148;
`


class ScheduleTable extends React.Component {
    _hasFetched = false
    //underscore means iternal, we use it only here

    constructor(props) {
        super(props)

        this.state = {
            lessons: [],
            message: ''
        }
        this.changeMessage = this.changeMessage.bind(this)
    }


    fetchLessons = () => {
        //this is called "lock"
        if (this._hasFetched || !this.props.firebase) {
            return
        }
        this._hasFetched = true

        this.props.firebase.lessons().get().then(snapshot => {
            const lessonsList = []
            snapshot.forEach(doc => lessonsList.push({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({
                lessons: lessonsList
            })
        })
            .catch(err => {
                console.log('Error getting documents', err);
            })
    }

    componentDidMount() {
        this.fetchLessons()
    }


    componentDidUpdate() {
        this.fetchLessons()
    }

    formRow(lesson) {
        const columns = []
        columns.push(<TableClassCell key={0}>{lesson.name}</TableClassCell>)
        for (let i = 1; i < 8; i++) {
            if (i === lesson.weekday) {
                columns.push(<TableCell key={i} ><BookButton lesson={lesson} selectedWeek={this.props.week} triggerParentUpdate={this.changeMessage} /></TableCell>)
            } else {
                columns.push(<TableCell key={i}></TableCell>)
            }
        }
        return columns
    }

    changeMessage() {
        this.setState({ message: 'Your booking has been made. For details check account page!' })
    }

    render() {
        const lessons = this.state.lessons
            .filter(l => {
                return (l.startWeek <= this.props.week) && (l.endWeek >= this.props.week)
            })
            .map(l => {
                return (<tr key={l.id}>{this.formRow(l)}</tr>)
            })
        return (
            <TableContainer>
                <Head title="Schedule" />
                <Table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                        </tr>
                    </thead>
                    <TableTitle>
                        {lessons}
                    </TableTitle>
                </Table>
                <Message>{this.state.message}</Message>
            </TableContainer>
        )
    }
}

export default withFirebase(ScheduleTable)
