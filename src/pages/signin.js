import React, { Fragment } from 'react'

import Layout from '../components/layout'
import {
    SignInGoogle
} from '../components/SignIn'
import styled from 'styled-components'

const Title = styled.h1`
grid-column: 2;
text-align: center;
`
const PageContainer = styled.div`
display: grid;
grid-template-columns: 8em auto 8em;
`
const ButtonContainer = styled.div`
grid-column: 2;
justify-self: center;
`



const SignInPage = () => (
    <Fragment>
        <PageContainer>
            <Title>Sign In</Title>
            <ButtonContainer>
                <SignInGoogle />
            </ButtonContainer>
        </PageContainer>
    </Fragment>
);

export default () => (
    <Layout>
        <SignInPage />
    </Layout>
);
