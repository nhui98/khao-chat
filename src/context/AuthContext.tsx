import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export const AuthContext = createContext<{
  currentUser: User | undefined;
}>({
  currentUser: undefined,
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      user && setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("auth state must be used within AuthContext");

  return context;
};
