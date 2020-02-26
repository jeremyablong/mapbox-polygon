import React from 'react';
import { Auth, Hub } from 'aws-amplify';

class NavAuth extends React.Component {
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
            this.setState({ user });
          }).catch(e => {
            console.log('Error: ', e);
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
            className='ui blue button'
            onClick={() => {
              Auth.federatedSignIn();
            }}
          >
            Log In
          </a>
        )}

        {user && user.attributes && (
          <a
            className='ui blue button'
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