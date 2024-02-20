import "./App.css";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email, uid } = result;
        setUserData({ displayName, email, uid });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, uid } = result.user;
        setUserData({ displayName, email, uid });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const SignUpUsingFacebook = () => {
    const provider = new FacebookAuthProvider();
    /*provider.setCustomParameters({
      display: "popup",
      auth_type: "reauthenticate",
      app_id: "995383751660364",
    });*/

    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, uid } = result.user;
        setUserData({ displayName, email, uid });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const SignUpUsingGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const { displayName, email, uid } = result.user;
      setUserData({ displayName, email, uid });
      setIsLoggedIn(true);
    });
  };

  const ForgetLogin = () => {
    setUserData({});
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <>
          <button
            onClick={SignUpUsingGoogle}
            type="button"
            className="login-btn google"
          >
            <i className="fab fa-google" style={{ marginRight: "5px" }}></i>{" "}
            {/* Ícone do Google */}
            Sign in with Google
          </button>
          <button
            onClick={SignUpUsingFacebook}
            type="button"
            className="login-btn facebook"
          >
            <i className="fab fa-facebook" style={{ marginRight: "5px" }}></i>{" "}
            {/* Ícone do Facebook */}
            Sign in with Facebook
          </button>
          <button
            onClick={SignUpUsingGithub}
            type="button"
            className="login-btn github"
          >
            <i className="fab fa-github" style={{ marginRight: "5px" }}></i>{" "}
            {/* Ícone do GitHub */}
            Sign in with GitHub
          </button>
          <button
            onClick={""}
            type="button"
            className="login-btn apple"
          >
            <i className="fab fa-apple" style={{ marginRight: "5px" }}></i>{" "}
            {/* Ícone da Apple */}
            Sign in with Apple
          </button>
        </>
      )}

      {isLoggedIn && (
        <div className="wrapper">
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img src={userData.photoURL} alt="profile card" />
            </div>
            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{userData.displayName}</div>
              <div className="profile-card__txt">{userData.email}</div>
              <div className="profile-card__txt">ID: {userData.uid}</div>
              <div className="profile-card-loc"></div>
              <div className="profile-card-ctr">
                <button
                  className="profile-card__button button--orange"
                  onClick={ForgetLogin}
                >
                  Forget Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
