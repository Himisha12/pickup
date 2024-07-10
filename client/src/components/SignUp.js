import React,{useState} from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import toast from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';

  
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  const [errors, setErrors] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

   try {
     const response = await fetch(`http://localhost:5000/api/auth/signup`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formValues),
     });

    //  console.log(response);
     const res_data = await response.json();
      console.log("response from server",res_data.extraDetails);

     if(response.ok){  
      storeTokenInLS(res_data.token);
        setFormValues({
          username: '',
          email: '',
          password: '',
        });
        toast.success("Signup successful!" ,{ duration: 3000,})
        navigate("/");
     }
     else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message ,{ duration: 3000,});
     }
     
   } catch (error) {
    toast.error(error ,{ duration: 3000,});
      console.log("signup", error)
   }

    // const newErrors = {};
    // Object.keys(formValues).forEach((field) => {
    //   if (!formValues[field]) {
    //     newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    //   }
    // });
    
    // setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   // Proceed with form submission
    //   console.log('Form submitted', formValues);
    // }
  };
  // const isFormValid = Object.values(formValues).every(value => value);

  return (
    <div>
        <div className='container' >
            <div className='SignUpBox'>
                <div className='signinform'>
                <div className='one'>
                <p className='createAccount'>Create Account</p>
                </div>
                <div className='two'>
                <p>Already have an account? <Link to="/login" className='loginLink'>Log in</Link></p>
                </div>
                <form className='form-container' onSubmit={handleSubmit}>
                {/* <button type='button' name='Sign up with Google' className='googleSignIn'>Sign up with Google</button>
                <p>or</p> */}
                    <div className='Name'>
                    <input type='text' name="username" placeholder='Enter Your Name' required autoComplete='off' value={formValues.username} onChange={handleChange}></input>
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                    {/* <input type='text' name='lastName' placeholder='Last Name' value={formValues.lastName} onChange={handleChange} ></input>
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>} */}
                    </div>
                    <input type='email' name='email' placeholder='Enter Your Email' required autoComplete='off' value={formValues.email} onChange={handleChange}></input>
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    <div className='passwordBox'>
                    <div className='password-container' id='password1'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Enter password'
                        required
                        autoComplete='off'
                        value={formValues.password}
                        onChange={handleChange}
                      />
                      <i
                        className={`toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      </div>
                      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                      {/* <div className='password-container' id='password2'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        required
                        autoComplete='off'
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                      />
                      <i
                        className={`toggle-password confirm fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={toggleConfirmPasswordVisibility}
                      ></i>
                      </div> */}
                      </div>
                      {/* {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>} */}
                    <button type='submit' name='Create_account'>Create Account</button>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp;