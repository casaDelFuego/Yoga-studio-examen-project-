import React from 'react'
import { withFirebase } from '../services'
import styled from 'styled-components'

const LessonName = styled.label`
margin: 1em;
font-size: 18px;
grid-column-start: 2;
grid-column-end: 3;
`
const AddLessonContainer = styled.div`
display: grid;
grid-template-columns: 7% 43% 43% 7%;
background-color: #f4fffb;
margin-bottom: 4em;

`
const Title = styled.h2`
 grid-column-start: 2;
 grid-column-end: 4;
 text-align: center;
`
const MiniTitle = styled.h3`
grid-row: 2;
 grid-column: 2;
 text-align: center;
 font-size: 20px;
 color: #461148;
`

const Input = styled.input`
border-radius: 7px;
width: 60%;
justify-self: center;
height: 1.5em;
outline: none;

`
const StartWeek = styled.label`
margin: 1em;
font-size: 18px;
grid-column: 2;

`

const EndWeek = styled.label`
margin: 1em;
font-size: 18px;
grid-column: 3;

`
const Weekday = styled.label`
margin: 1em;
font-size: 18px;
grid-column: 2;
`
const Select = styled.select`
font-size: 18px;
width: 60%;
float: left;
`

const Time = styled.label`
margin: 1em;
font-size: 18px;
grid-column: 3;
`

const MaxNumber = styled.label`
margin: 1em;
font-size: 18px;
grid-column: 2;
`
const AddButton = styled.button`
grid-column: 3;
align-self: center;
justify-self: center;
outline: none;
background-color: #a8eae9;
width: 6em;
height: 2em;
font-size: 20px;
border-radius: 10px;
&:hover {
    cursor: pointer;
    background-color: #b66eba;
    color: white;
}
`

const AddMoreButton = styled.button`
grid-column: 2;
justify-self: center;
outline: none;
background-color: #a8eae9;
width: 10em;
height: 1.7em;
font-size: 18px;
border-radius: 6px;
&:hover {
    cursor: pointer;
    background-color: #b66eba;
    color: white;
}
`



class AddLessons extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.createNewLesson = this.createNewLesson.bind(this)
        this.backToForm = this.backToForm.bind(this)

        this.state = {
            name: '',
            startWeek: '',
            endWeek: '',
            weekday: '',
            time: '',
            maxNumStudents: '',
            status: ''

        }
    }


    handleInputChange(event) {
        const name = event.target.name
        const newValue = event.target.value

        this.setState({
            [name]: newValue
        })
    }

    createNewLesson() {
        this.props.firebase.lessons().add({
            ...this.state,
            startWeek: parseInt(this.state.startWeek),
            endWeek: parseInt(this.state.endWeek),
            weekday: parseInt(this.state.weekday),
            maxNumStudents: parseInt(this.state.maxNumStudents)

        }).then(() => {
            this.setState({ status: 'The lesson has been added' })
            //.log('new lesson has been added')
        }).catch(err => {
            console.log('error in adding new lesson', err)
        })
    }

    backToForm() {
        this.setState({
            name: '',
            startWeek: '',
            endWeek: '',
            weekday: '',
            time: '',
            maxNumStudents: '',
            status: ''
        })
    }


    render() {
        if (!this.state.status) {
            return (
                <AddLessonContainer>
                    <Title>Add a lesson</Title>

                    <LessonName>Lesson name<br />
                        <Input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        /></LessonName><br />

                    <StartWeek>Start week<br />
                        <Input
                            type="text"
                            name="startWeek"
                            value={this.state.startWeek}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        /></StartWeek>

                    <EndWeek>End week<br />
                        <Input
                            type="text"
                            name="endWeek"
                            value={this.state.endWeek}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        /></EndWeek><br />

                    <Weekday>Weekday<br />
                        <Select
                            type="text"
                            name="weekday"
                            value={this.state.weekday}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="7">Sunday</option>
                        </Select>
                    </Weekday>
                    <Time>Time<br />
                        <Input
                            type="text"
                            name="time"
                            value={this.state.time}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        /></Time><br />

                    <MaxNumber>Maximum number of students<br />
                        <Input
                            type="text"
                            name="maxNumStudents"
                            value={this.state.maxNumStudents}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                        /></MaxNumber>


                    <AddButton onClick={this.createNewLesson} >Add</AddButton>

                </AddLessonContainer>

            )
        } else {
            return (
                <AddLessonContainer>
                    <Title>Add a lesson</Title>
                    <MiniTitle>{this.state.status}</MiniTitle>
                    <AddMoreButton onClick={this.backToForm}>Add more lessons</AddMoreButton>
                </AddLessonContainer>
            )
        }
    }

}

export default withFirebase(AddLessons)