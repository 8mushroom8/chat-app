import React, { useState, useEffect } from "react";
import { signInWithGoogle, logOut, auth } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "../Chat/Chat";

function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <button style={{ marginBottom: "20px" }} onClick={logOut}>
            Log Out
          </button>
          <Chat user={user} />
        </>
      ) : (
        <>
          <h2>Please, Sign In</h2>
          <button onClick={signInWithGoogle}>Sign In</button>
        </>
      )}
    </div>
  );
}

export default Auth;
