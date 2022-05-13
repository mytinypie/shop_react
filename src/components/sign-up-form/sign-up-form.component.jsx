import {useState} from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } =formFields;



    const resetFormFields =() =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Password and confirm password must be the same");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);


            await  createUserDocumentFromAuth(user, {displayName});

            resetFormFields();
        }catch (error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use');
            }else{
                alert(error);
            }

            return;
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields,[name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={(event)=>{
               const result = handleSubmit(event);
            }}>
                <FormInput
                    label="Display name"
                    name="displayName"
                    type="text"
                    required
                    onChange={handleChange}
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                />
                <Button type="submit" >Sign Up</Button>

            </form>
        </div>
    );
}
export default SignUpForm;