import '../styles/login.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginlogo from '../assets/Cv.png'
import login from '../assets/instagram-web-lox-image-2x.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const LogIn = () => {
   const location = useLocation(); 
   const navigate = useNavigate();

  const intialemail=location.state?.email || '';
  // const username = location.state?.username || 'User';

  const [showPassword, setShowPassword] = useState(false);

 
  const formik = useFormik({
    initialValues: {
      email: intialemail,
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required("Please Enter your password")
        }),


  onSubmit :async(values) => {
    //https://763a221bbcf4.ngrok-free.app/login
          try{
         const response=await axios.post('https://chatbackend-ph5y.onrender.com/login',{
         email:values.email,
         password:values.password,
    })
 
    console.log("res",response)
  

    if (response.status === 200 ) {
       toast.success("🎉 log in successfully!", {
                  position: "top-center",     // Top center of the page
                  autoClose: 3000,            // Closes after 5 seconds
                  hideProgressBar: true,     // Shows progress bar
                  closeOnClick: true,         // Clicking closes it
                  pauseOnHover: true,         // Pause timeout on hover
                  draggable: true,            // Can be dragged
                  theme: "colored"            // Colorful background
                });

                setTimeout(()=>{ navigate("/chatvat",{state:{name:response.data.Name,email: values.email ,username:response.data.username }})
              },3000 )
     }
    } 
     
    
     catch (err) {
      console.log("Login error:", err);
    
      if (err.response) {
        const errorMsg = err.response.data.msg || err.response.data.error || "Login failed";
    
        toast.error(`❌ ${errorMsg}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      } 
      
      
      else {
        toast.error("🚨 Network error. Please try again!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored"
        });
      }
    }
    
   
        },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToSignup = useCallback(() => {
    navigate("/");
  }, []);
  const handleNavigateToForget=useCallback(()=>{
    navigate('/forgetPassword')
  },[])


  return (
 <div>
    <div className='cantainer'>
     <img src={login} alt="loginlogo" className="insta"/>

          <form className=' container-form' onSubmit={formik.handleSubmit} >
            <div className="loginp">
              <img className='gamelogo' src={loginlogo} alt="LOCK logo" />
              <p className='ltext-center mb-4 mt-0 '>ChatVat</p>
            </div>
            <div className='form-group'>
              <input
                id='email'
                name='email'
                type='email'
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='Email Address'
               
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='logerror-message'>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className='form-group'>
              <div className='password-input'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${formik.touched.password  && formik.errors.password  ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder='enter your password'
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                  className="password-icon"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className='logerror-message'>{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className='btnlogin' > logIn</button>
            <div className="separator">
                <span>OR</span>
            </div>
            <p className='account'>Forgot your login details? <Link to='/forgetPassword' className='mt-3' onClick={handleNavigateToForget}>
              Reset your password?
            </Link> </p>
            <p className='or'>OR</p>
            <div className='d-flex' >
            <p className='dont'>Don't have an account?</p>
            <p className='signup' onClick={handleNavigateToSignup}>Sign Up</p>
            </div>
          </form>
        </div >

        <p  className="custom-footer">Meta
About Help Privacy Terms Contact Uploading & Non-Users   A.S Verified
</p>
  <p className="custom-footer">
        English  © 2025 ChatVat from AshuWorld
</p>
<ToastContainer/>
        </div>
  );
};
export default LogIn;