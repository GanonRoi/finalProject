import { auth } from "./firbase";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async(EmailAuthCredential, password)=>{
    return CreateUserWithEmailAndPassword(auth, EmailAuthCredential, password);
};

export const doSignInWithEmailAndPassword =  (email,password) =>{
    return SignInWithEmailAndPassword(auth,email,password);
};

export const doSignInWithGoogle = async () =>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    //result.user
    return result
};


export const doSignOut = () =>{
    return auth.signOut();
}