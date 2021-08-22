import app from "./app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "@firebase/auth";

const auth = getAuth(app);

export const login  = () => signInWithPopup(auth, new GoogleAuthProvider);
export const logout = () => signOut(auth);

export default auth;