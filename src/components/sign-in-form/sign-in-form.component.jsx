import {useState } from "react";
import './sign-in-form.styles'
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {SignInContainer, Title, ButtonsContainer} from "./sign-in-form.styles";


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
        <SignInContainer>
            <Title>I already have an account</Title>
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
                <ButtonsContainer>
                    <Button type="submit" >Sign In</Button>
                    <Button type="button"
                            buttonType={BUTTON_TYPE_CLASSES.google}
                            onClick={signInWithGoogle} >
                        Google Sign In
                    </Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    );
}
export default SignInForm;