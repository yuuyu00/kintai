import React, { createContext, useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { WorkRecord, SignUp } from "./containers";
import { Loading } from "./components/templates";
import { Header } from "./components/organisms";
import { useAuth } from "./hooks";
import { signOut, User } from "firebase/auth";

const cache: InMemoryCache = new InMemoryCache({});
const { NODE_ENV, REACT_APP_ENDPOINT_DEV, REACT_APP_ENDPOINT_PROD } =
  process.env;

const initialValue: {
  user: User | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

export const AuthContext = createContext(initialValue);

const App = () => {
  const [signInCompleted, setSignInCompleted] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);
  const { user, needToSignIn, auth, onSignUp } = useAuth();

  useEffect(() => {
    if (token || user === null) return;

    user.getIdToken().then((res) => setToken(res));
  }, [user, token]);

  useEffect(() => {
    if (needToSignIn) {
      setSignInCompleted(false);
    }
  }, [needToSignIn]);

  const apolloClient = new ApolloClient({
    cache,
    uri:
      NODE_ENV === "development"
        ? REACT_APP_ENDPOINT_DEV
        : REACT_APP_ENDPOINT_PROD,
    headers: {
      authorization: token || "",
    },
  });

  return (
    <ApolloProvider client={apolloClient}>
      {(needToSignIn === undefined ||
        (needToSignIn === false && user === null)) && <Loading />}
      {user !== null && signInCompleted && (
        <AuthContext.Provider value={{ user, token }}>
          <Header />
          <button className="text-sm" onClick={() => signOut(auth!)}>
            サインアウトボタン（仮）
          </button>
          <div className="px-20 py-16">
            <WorkRecord />
          </div>
        </AuthContext.Provider>
      )}
      {!signInCompleted && (
        <>
          <Header />
          <SignUp
            onSignUpFirebase={onSignUp}
            onCompleteSigunUp={() => setSignInCompleted(true)}
          />
        </>
      )}
    </ApolloProvider>
  );
};

export default App;
