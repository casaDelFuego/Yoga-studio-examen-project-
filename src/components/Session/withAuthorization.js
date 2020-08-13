import React from 'react';
import { navigate } from 'gatsby';

import AuthUserContext from './context';
import { withFirebase } from '../../services';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => {
    return Component => {
        // Generate dynamic class
        class WithAuthorization extends React.Component {
            _initFirebase = false;

            firebaseInit = () => {
                if (this.props.firebase && !this._initFirebase) {
                    this._initFirebase = true;

                    this.stopListening = this.props.firebase.onAuthUserListener(
                        authUser => {
                            if (!condition(authUser)) {
                                navigate(ROUTES.SIGN_IN);
                            }
                        },
                        () => navigate(ROUTES.SIGN_IN),
                    );
                }
            };

            componentDidMount() {
                this.firebaseInit();
            }

            componentDidUpdate() {
                this.firebaseInit();
            }

            /*componentWillUnmount() {
                this.stopListening && this.stopListening();
            }*/

            render() {
                return (
                    <AuthUserContext.Consumer>
                        {authUser =>
                            condition(authUser) ? <Component {...this.props} /> : null
                        }
                    </AuthUserContext.Consumer>
                );
            }
        }

        // return dynamic class decorated with injected firebase-service.    
        return withFirebase(WithAuthorization);
    }
}

export default withAuthorization;
