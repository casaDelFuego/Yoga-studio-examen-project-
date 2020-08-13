import React, { Component } from 'react'
import { navigate } from 'gatsby'

import { withFirebase } from '../../services'
import * as ROUTES from '../../constants/routes'
import styled from 'styled-components'

const GoogleForm = styled.button`
outline: none;
background-color: #a8eae9;
padding: 0.8em;
width: auto;
height: auto;
font-size: 20px;
border-radius: 10px;
&:hover {
    cursor: pointer;
    background-color: #df3887;
    color: white;
}
`
const ErrorMessage = styled.p`
font-size: 20px;
text-align: center;
`

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too

                //we need conditional render. set if user not exist
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email
                });
            })
            .then(() => {
                this.setState({ error: null });
                navigate(ROUTES.schedule);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <GoogleForm type="submit">Sign In with Google</GoogleForm>

                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </form>
        );
    }
}


const SignInGoogle = withFirebase(SignInGoogleBase);


export { SignInGoogle };
