import React from 'react'
import ScheduleTable from './schedule-table'
import moment from 'moment'
import styled from 'styled-components'
import arrowLeft from '../images/arrow-left.png'
import arrowRight from '../images/arrow-right.png'



const PaginatorContainer = styled.div`
display: grid;
grid-template-columns: 10em 3em auto 3em 10em;
margin: 2em;
align-items: center;

`
const ButtonLeft = styled.span`
/*background-color: #666666;*/
grid-column: 2;
align-self: stretch;
justify-self: left;
&:hover {
    cursor: pointer;
    /*background-color: #e768b5;*/
}
`
const ButtonRight = styled.span`
grid-column: 4;
align-self: stretch;
justify-self: right;
&:hover {
    cursor: pointer;
    /*background-color: #e768b5;*/
}

`
const ArrowContainer = styled.img`
width: 30px;
height: auto;
`
const WeekTitle = styled.div`
color: #461148;
justify-self: center;
grid-column: 3;
font-size: 28px;
font-style: bold;
`

class WeekPaginator extends React.Component {
    constructor(props) {
        super(props)

        this.moveToNextWeek = this.moveToNextWeek.bind('this')
        this.moveToPreviousWeek = this.moveToPreviousWeek.bind('this')

        this.state = {
            currentWeek: moment().week()
        }
    }

    moveToNextWeek = () => this.setState({ currentWeek: this.state.currentWeek + 1 })

    moveToPreviousWeek = () => this.setState({ currentWeek: this.state.currentWeek - 1 })

    render() {
        return (
            <div>
                <PaginatorContainer>
                    <ButtonLeft onClick={this.moveToPreviousWeek}>
                        <ArrowContainer src={arrowLeft} alt="arrow-left" />
                    </ButtonLeft>
                    <WeekTitle>Week {this.state.currentWeek}</WeekTitle>
                    <ButtonRight onClick={this.moveToNextWeek}>
                        <ArrowContainer src={arrowRight} alt="arrow-left" />
                    </ButtonRight>
                </PaginatorContainer>
                <ScheduleTable week={this.state.currentWeek} />
            </div>
        )
    }
}

export default WeekPaginator
