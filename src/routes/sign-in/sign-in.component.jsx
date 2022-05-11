import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

const SignIn= () =>{
    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
       const userDocRef  = await createUserDocumentFromAuth(user);
       // console.log(response);
    }

    return(
        <div>Sign in
            <button onClick={logGoogleUser}>Sign in with google account</button>
        </div>
    )
}
export default SignIn;