import React from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
    withAuthorization,
} from '../components/Session';
import styled from 'styled-components'
import WeekPaginator from '../components/week-paginator';



const SchedulePageBase = () => (
    <div>
        <WeekPaginator />
    </div>
);

const condition = authUser => !!authUser;

const SchedulePage = compose(
    withAuthorization(condition),
)(SchedulePageBase);

export default () => (
    <Layout>
        <SchedulePage />
    </Layout>
);
