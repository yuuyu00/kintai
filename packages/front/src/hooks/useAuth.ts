import { useMemo, useState } from "react";
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

  const firebaseConfig: FirebaseOptions = useMemo(
    () => ({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    }),
    []
  );

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
  }, [auth, firebaseConfig]);

  const onSignUp = async () => {
    if (!auth) return;

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
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
