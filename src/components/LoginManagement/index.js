import React, { Component } from 'react';

import { withFirebase } from '../../services';

const SIGN_IN_METHODS = [

    {
        id: 'google.com',
        provider: 'googleProvider',
    },

];

class LoginManagement extends Component {
    _initFirebase = false;

    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    firebaseInit = () => {
        if (this.props.firebase && !this._initFirebase) {
            this._initFirebase = true;

            this.fetchSignInMethods();
        }
    };

    componentDidMount() {
        this.firebaseInit();
    }

    componentDidUpdate() {
        this.firebaseInit();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password,
        );

        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    render() {
        const { activeSignInMethods, error } = this.state;

        return (<div>
            {SIGN_IN_METHODS.map(signInMethod => {
                const onlyOneLeft = activeSignInMethods.length === 1;
                const isEnabled = activeSignInMethods.includes(
                    signInMethod.id,
                );

                /* return (
                     <SocialLoginToggle
                         onlyOneLeft={onlyOneLeft}
                         isEnabled={isEnabled}
                         signInMethod={signInMethod}
                         onLink={this.onSocialLoginLink}
                         onUnlink={this.onUnlink}
                     />
                 )*/
            }


            )}

            <p>{error && error.message}</p>
        </div>
        );
    }
}

/*const SocialLoginToggle = ({
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink,
}) =>
    isEnabled ? (
        <button
            type="button"
            onClick={() => onUnlink(signInMethod.id)}
            disabled={onlyOneLeft}
        >
            Deactivate {signInMethod.id}
        </button>
    ) : (
            <button
                type="button"
                onClick={() => onLink(signInMethod.provider)}
            >
                Link {signInMethod.id}
            </button>
        );*/


export default withFirebase(LoginManagement);
