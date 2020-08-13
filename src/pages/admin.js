import React, { Fragment } from 'react'
import { compose } from 'recompose'

import Layout from '../components/layout'
import {
    withAuthorization
} from '../components/Session'
import AddLessons from '../components/add-lessons'
import LessonsManager from '../components/manage-lessons'
import Head from '../components/head'

const AdminPageBase = () => (
    <Fragment>
        <Head title="Admin UI" />
        <AddLessons />
        <LessonsManager />
    </Fragment>
)

const condition = authUser => {
    //this is bad security to show admin id in the source code, but it's protected by database rules
    return authUser && authUser.uid === '93VxKd5XBIUGOrEHc4px8kD86LF3'

}


const AdminPage = compose(
    withAuthorization(condition),
)(AdminPageBase)

export default () => (
    <Layout>
        <AdminPage />
    </Layout>
);
