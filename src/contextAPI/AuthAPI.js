import React, { useContext, useState, useEffect } from "react";

import { auth } from "../firebase";

const AuthAPIContext = React.createContext();

export function useAuthAPI() {
  return useContext(AuthAPIContext);
}

export function AuthAPIProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loginFlagAPI, setLoginFlagAPI] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setLoginFlagAPI(true);
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      setLoginFlagAPI(false);
    });
    return unsubscribe;
  }, []);

  const AuthDataAPI = {
    currentUser,
    signup,
    login,
    logout,
    setLoginFlagAPI,
    loginFlagAPI,
    loading,
    setCurrentUser,
  };

  return (
    <AuthAPIContext.Provider value={AuthDataAPI}>
      {!loading && children}
    </AuthAPIContext.Provider>
  );
}
