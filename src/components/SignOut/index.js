import React from 'react';

import { withFirebase } from '../../services';

const SignOutButton = ({ firebase }) => (
    <span
        type="button"
        onClick={firebase ? firebase.doSignOut : () => { }}
    >
        Sign Out
  </span>
);

export default withFirebase(SignOutButton);
