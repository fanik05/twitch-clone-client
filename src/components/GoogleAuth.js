import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  const onAuthChange = useCallback(
    isSignedIn => {
      if (isSignedIn) {
        signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
      } else {
        signOut();
      }
    },
    [signIn, signOut],
  );

  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
      const auth = window.gapi.auth2.getAuthInstance();
      onAuthChange(auth.isSignedIn.get());
      auth.isSignedIn.listen(onAuthChange);
    });
  }, [onAuthChange]);

  const onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button onClick={onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = ({ auth }) => {
  return { isSignedIn: auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
