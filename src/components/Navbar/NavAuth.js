import React, { Component } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);

class NavAuth extends Component {
  state = { user: null };

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        default:
          Auth.currentAuthenticatedUser().then(user => {
            console.log(user);
            this.setState({ user });
          }).catch(e => {
            console.log(e);
          });
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="item">
        {!user && (
          <a
            className='ui inverted blue button'
            onClick={() => {
              Auth.federatedSignIn();
            }}
          >
            Log In
          </a>
        )}

        {user && user.attributes && (
          <a
            className='ui inverted blue button'
            onClick={() => {
              Auth.signOut().catch((error) => {
                console.log('=== signOut error:', error);
              });
            }}
          >
            Log Out {user.attributes.name || user.attributes.email}
          </a>
        )}
      </div>
    );
  };
};

export default NavAuth;