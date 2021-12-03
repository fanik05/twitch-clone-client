import { useEffect, useState } from 'react';

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
      const auth = window.gapi.auth2.getAuthInstance();
      setIsSignedIn(auth.isSignedIn.get());
      auth.isSignedIn.listen(onAuthChange);
    });
  }, []);

  const onAuthChange = () => {
    setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  const onSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button onClick={onSignIn} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
