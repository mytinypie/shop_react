import {useState } from "react";
import './sign-in-form.styles.scss'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;



    const resetFormFields =() =>{
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);


            resetFormFields();
        }catch (e) {

            switch (e.code){
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(e);
            }

        }

    }
    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(event)=>{
                const result = handleSubmit(event);
            }}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={email}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle} >Google Sign In</Button>
                </div>

            </form>
        </div>
    );
}
export default SignInForm;