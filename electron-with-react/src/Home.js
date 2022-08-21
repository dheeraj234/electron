import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Display from './Display';
import './Home.css';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const Home = (props) => {
  // const [hello,setHello]=useState(false)y
  const [formDetails, setFormDetails] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmpassword:'',
    firstNameError:'',
    lastNameError:'',
    emailAddressError: "",
    passwordError: "",
    passwordConfirmationError: "",
    formSubmitted:false
  });
 

  const navigate = useNavigate();

  const signup=(e)=>{
    localStorage.setItem("formData",JSON.stringify(formDetails));
    console.log(formDetails);
    e.preventDefault();
    props.setFormDetails(formDetails);
    let formFields = [
      "fname",
      "lname",
      "email",
      "password",
      "Confirmpassword"
    ];
    let isValid=true;
    formFields.forEach(field => {
      isValid = validateField(field) && isValid;
    });

    if (isValid) setFormDetails({ formSubmitted: true });
    else setFormDetails({ formSubmitted: false });

    return formDetails.formSubmitted;
    
    // setHello(true);

    // return(
    //   <Display/>
    // );
  }

  function handleblur(e){
    const {name}= e.target;
    validateField(name);
    return;
  }

  function validateField(name) {
    let isValid = false;

    if (name === "fname") isValid = validateFirstName();
    else if (name === "lname") isValid = validateLastName();
    else if (name === "email") isValid = validateEmailAddress();
    else if (name === "password") isValid = validatePassword();
    else if (name === "Confirmpasssword") isValid = validatePasswordConfirmation();
    return isValid;
  }

  function validateFirstName() {
    let firstNameError = "";
    const value = formDetails.fname;
    if (value?.trim() === "")  firstNameError = "First Name is required";

    setFormDetails({
      firstNameError
    });
    return firstNameError === "";
  }

  function validateLastName() {
    let lastNameError = "";
    const value = formDetails.lname;
    if (value?.trim() === "") lastNameError = "Last Name is required";

    setFormDetails({
      lastNameError
    });
    return lastNameError === "";
  }

  function validateEmailAddress() {
    let emailAddressError = "";
    const value = formDetails.email;
    if (value?.trim() === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    setFormDetails({
      emailAddressError
    });
    return emailAddressError === "";
  }

  function validatePassword() {
    let passwordError = "";
    const value = formDetails.password;
    if (value?.trim() === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    setFormDetails({
      passwordError
    });
    return passwordError === "";
  }

  function validatePasswordConfirmation() {
    let passwordConfirmationError = "";
    if (formDetails.password !== formDetails.confirmpassword)
      passwordConfirmationError = "Password does not match Confirmation";

    setFormDetails({
      passwordConfirmationError
    });
    return passwordConfirmationError === "";
  }

  function handleChange(e){
    const {name,value}=e.target;
    setFormDetails({...formDetails,[name]:value});
    console.log(name,value);
  }

  // (e) => {setFormDetails((details) => { return  {...details, fname: e.target.value}})}

  return (
    <div className='container'>
      <h1>Register</h1>
      {formDetails.formSubmitted ? (<Display details={formDetails}/>):(
        <form action='/Display' onSubmit={signup}>
            <div class='form-group'>
              <input 
                 type='text' 
                 name='fname'
                 value={formDetails.fname} 
                 onBlur={handleblur} 
                 onChange={handleChange} 
                 id='fname' 
                 placeholder='first name' 
                 required/>
                 <br />
                 {formDetails.firstNameError && (
                 <div className="errorMsg">{formDetails.firstNameError}</div>
                 )}
            </div>
            <div class='form-group'>
              <input 
                 type='text' 
                 name='lname'
                 value={formDetails.lname}
                 onBlur={handleblur} 
                 onChange={handleChange} 
                 id='lname' 
                 placeholder='last name' 
                 required/>
                 <br />
                 {formDetails.lastNameError && (
                 <div className="errorMsg">{formDetails.lastNameError}</div>
                 )}
            </div>
            <div class='form-group'>
              <input 
                 type='email' 
                 name='email'
                 value={formDetails.email} 
                 onBlur={handleblur} 
                 onChange={handleChange}
                 id='email' 
                 placeholder='Email Address' 
                 required/>
                 <br />
                 {formDetails.emailAddressError && (
                 <div className="errorMsg">{formDetails.emailAddressError}</div>
                 )}
            </div>
            <div class='form-group'>
              <input 
                type='password' 
                name='password'
                value={formDetails.password} 
                onBlur={handleblur} 
                onChange={handleChange}
                id='password' 
                placeholder='password' 
                required/>
                <br />
                {formDetails.passwordError && (
                <div className="errorMsg">{formDetails.passwordError}</div>
                )}
            </div>
            <div class='form-group'>
              <input 
                type='password' 
                name='confirmpassword'
                value={formDetails.confirmpassword} 
                onBlur={handleblur} 
                onChange={handleChange}
                id='confirmpassword' 
                placeholder='confirmpassword' 
                required/>
                <br />
                {formDetails.passwordConfirmationError && (
                <div className="errorMsg">
                {formDetails.passwordConfirmationError}
                </div>
                )}
            </div>
            <div class='form-group'>
              <button type='submit'onClick={()=>{navigate("/display")}}>Sign Up</button>
            </div>
        </form>)}
    </div>
  );
 
}

export default Home;