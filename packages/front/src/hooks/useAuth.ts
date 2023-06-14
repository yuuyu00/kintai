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
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
