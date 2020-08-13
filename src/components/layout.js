import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Navigation from './Navigation'
import getFirebase, { FirebaseContext } from '../services'
import withAuthentication from './Session/withAuthentication'
import Footer from './Navigation/footer'
import Head from '../components/head'




const Container = styled.div`
font-family: 'Lato', sans-serif;
margin: 0;
align-content: center;
display: flex;
flex-direction: column;
min-height: 100vh;
`

const Content = styled.div`
flex-grow: 1;

`

class Layout extends Component {
    state = {
        firebase: null,
    };

    componentDidMount() {
        const app = import('firebase/app');
        const auth = import('firebase/auth');
        const database = import('firebase/database');

        Promise.all([app, auth, database]).then(values => {
            const firebase = getFirebase(values[0]);

            this.setState({ firebase });
        });
    }

    render() {
        return (
            <FirebaseContext.Provider value={this.state.firebase}>
                <AppWithAuthentication {...this.props} />
            </FirebaseContext.Provider>
        );
    }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
    <Container>
        <Head />
        <Fragment>
            <Content>
                <Navigation />
                {children}
            </Content>
            <Footer />
        </Fragment>
    </Container>
));

export default Layout;
