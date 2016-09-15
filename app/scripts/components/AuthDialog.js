import React from 'react';
import Button from './Button';
import * as Colors from 'material-ui/styles/colors';

class AuthDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    loginWithGoogle = (event) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        window.firebase.auth().signInWithRedirect(provider);
    };

    render() {
        return (
            <div>
                <h2>Sign up or log in</h2>

                <Button
                    backgroundColor={Colors.red700}
                    label="Log in with Google"
                    onClick={this.loginWithGoogle}
                    style={{color: Colors.white}}
                />
            </div>
        );
    }
}

export default AuthDialog;
