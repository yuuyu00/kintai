import { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [needToSignIn, setNeedToSignIn] = useState<boolean | undefined>(
    undefined
  );

  const {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID,
  } = process.env;

  const firebaseConfig: FirebaseOptions = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID,
  };

  useEffect(() => {
    if (auth) return;

    (async () => {
      initializeApp(firebaseConfig);
      const _auth = getAuth();
      setAuth(_auth);

      onAuthStateChanged(_auth, async (user) => {
        if (user) {
          setNeedToSignIn(false);
          return;
        }

        setNeedToSignIn(true);
      });
    })();
  }, []);

  const onSignUp = async () => {
    if (!auth) return;

    const provider = new GoogleAuthProvider();
    const authResult = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(authResult);
    const token = await auth.currentUser?.getIdToken();

    return {
      token,
    };
  };

  return {
    auth,
    user: auth ? auth.currentUser : null,
    needToSignIn,
    onSignUp,
  };
};
