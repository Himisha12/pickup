import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../store/auth';
import toast from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';

const URL = "http://localhost:5000/api/auth/login"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  const [errors, setErrors] = useState({});

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
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      console.log("login form",response);
      const res_data = await response.json();
      if(response.ok){
       
        toast.success("Login Successful" ,{ duration: 3000,});
        storeTokenInLS(res_data.token);
      // localStorage.setItem("token",res_data.token);
        setFormValues({
          username: '',
          password: '',
        });
        navigate("/");
        // setInterval(() => {
        //   window.location.reload();
        // }, 100);
     }
      else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message ,{ duration: 3000,});
        console.log("invalid credential");
      }

    } catch (error) {
      console.log(error);
    }

    const newErrors = {};
    if (!formValues.username) {
      newErrors.username = 'Username is required';
    }
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      console.log('Form submitted', formValues);
    }
  };

  // const isFormValid = Object.values(formValues).every(value => value);

  return (
    <div>
        <div className='loginContainer'>
        <div className='loginBox'>
          <form className='login-form-container' onSubmit={handleSubmit}>
            <p className='login'>Login</p>
            <input type='text' name='username' placeholder='Enter your Name'  value={formValues.username}
              onChange={handleChange}></input>
              {errors.username && <p className='error-message'>{errors.username}</p>}
              <div className='password-container'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Enter your Password'
                value={formValues.password}
                onChange={handleChange}
              />
              <i
                className={`toggle-password-login fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {errors.password && <p className='error-message'>{errors.password}</p>}
            <button type='submit' name='login' >Login</button>
            <p>Dont have an account? <Link to="/signup" className='registerLink' >Register</Link></p>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Login