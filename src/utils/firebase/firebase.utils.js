import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3oUEQBDJ_Zj__9Bs7ozvsPVd9HA6nXmg",
    authDomain: "shop-react-db-6fa15.firebaseapp.com",
    projectId: "shop-react-db-6fa15",
    storageBucket: "shop-react-db-6fa15.appspot.com",
    messagingSenderId: "881854841267",
    appId: "1:881854841267:web:787d9d05634e70d2fa4bc6"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db=getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef,{
                displayName,
                    email,
                    createdAt
            });
        }catch (error){
            console.log('error creating the user', error.message);
        }
    };

    return userDocRef;
}