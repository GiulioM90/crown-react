// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDxwoWCCXRyFEekArt4RCUR35J97a72jg",
    authDomain: "crwn-react-db-4ad4a.firebaseapp.com",
    projectId: "crwn-react-db-4ad4a",
    storageBucket: "crwn-react-db-4ad4a.appspot.com",
    messagingSenderId: "552834848034",
    appId: "1:552834848034:web:3984f0cc42f211d60f817b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) ;

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error) {
            console.log('error creating the user ', error.message)
        }
    }
    return userDocRef;
}
