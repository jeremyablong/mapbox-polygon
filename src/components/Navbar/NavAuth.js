import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Amplify, { Auth, Hub } from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);

class NavAuth extends Component {
    state = { user: null, customState: null };

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

    render() {
        const { user } = this.state;

        return (
            <li>
				{!user && (
					<a
                        className='navbar-link navbar-btn'
                        onClick={() => {
                            Auth.federatedSignIn();
                        }}
                    >
                        Log In
                    </a>
				)}

				{user && user.attributes && (
					<a
                        className='navbar-link navbar-btn'
                        onClick={() => {
                            Auth.signOut().catch((error) => {
                                console.log('=== signOut error:', error);
                            });
                        }}
                    >
                        Log Out {user.attributes.name || user.attributes.email}
                    </a>
				)}
			</li>
        );
    };
};

export default NavAuth;