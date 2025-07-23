import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
const navigate = useNavigate();


  const emailRef = useRef(null);
  const phnRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);   
  const usernameRef = useRef(null);



  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef) {
        nextRef.current?.focus();
      } else {
        formik.handleSubmit(); // Trigger form submit on last field
      }
    }
  };
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '', 
      username: '',
      phonenumber:''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .min(5, 'At least 5 characters')
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include a special character')
        .required('Password is required'),
      phonenumber: Yup.string()
        .matches(/^\d+$/, 'Only digits allowed')
         .min(10, 'Must be at least 10 digits')
        .max(12, 'Must be at most 12 digits')
        .required('Phone number is required'),
        
      username: Yup.string()
        .required('username  is required'),
    }),
    onSubmit: async(val) => {
      try{
        console.log("val",val);
      // .   http://3.6.104.231:2020/post
        const response=await axios.post('https://chatbackend-ph5y.onrender.com/post',{
       
          email:val.email,
          password:val.password,
          fullName:val.fullName,
          username:val.username,
          phonenumber:val.phonenumber
        })
        console.log("res",response);
        
 
        if(response.status===201){
          toast.success("🎉 Account created successfully!", {
            position: "top-center",     // Top center of the page
            autoClose: 3000,            // Closes after 5 seconds
            hideProgressBar: true,     // Shows progress bar
            closeOnClick: true,         // Clicking closes it
            pauseOnHover: true,         // Pause timeout on hover
            draggable: true,            // Can be dragged
            theme: "colored"            // Colorful background
          });
          

          setTimeout(() => {
            navigate("/login", {
              state: {
                name: response.data.username,
                email: val.email,
                username: val.username
              }
            });
          }, 3000);
        }
      }catch(err){ 
        toast.error("❌ Email, phone or username already exists!", {
          className: "my-toast",
          progressClassName: "my-progress",
      position: "bottom-right",
       hideProgressBar: true, 
      autoClose: 2000,
      draggable: true,  
      pauseOnHover: true,  
      theme: "colored"
    });
    console.log("Signup error:", err);
      }
    },
  });

  return (
    <div className='signup-container '>
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <h1 className="signup-heading">
      <FontAwesomeIcon icon={faComments} style={{ marginRight: '10px', color: '#e1306c' }} />
      chatvat</h1>

      <div className="signup-inputs">
        <input
          className="signup-input"
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onKeyDown={(e) => handleKeyDown(e, phnRef)}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

<input
          className="signup-input"
          ref={phnRef}
          type="phonenumber"
          name="phonenumber"
          placeholder="phonenumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phonenumber}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
        />
         {formik.touched.phonenumber && formik.errors.phonenumber && (
          <div className="error">{formik.errors.phonenumber}</div>
        )}


        <input
          className="signup-input"
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onKeyDown={(e) => handleKeyDown(e, fullNameRef)}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <input
          className="signup-input"
          ref={fullNameRef}
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          onKeyDown={(e) => handleKeyDown(e, usernameRef)}
        />
{formik.touched.username && formik.errors.username && (
  <div className="error">{formik.errors.username}</div>
)}

<input
  className="signup-input"
  ref={usernameRef}
  type="text"
  name="username"
  placeholder="Username"
  onChange={formik.handleChange}
  value={formik.values.username}
  onKeyDown={(e) => handleKeyDown(e, null)} // null means submit
/>

      </div>

      <div className="signup-info">
        <p>
          People who use our service may have uploaded your contact information to chatvat.
        </p>
        <p>
          By signing up, you agree to our <span className="link-text">Terms</span>, <span className="link-text">Privacy Policy</span>, and <span className="link-text">Cookies Policy</span>.
        </p>
      </div>

      <button type="submit" className="signup-button">Sign Up</button>
      
      <div className="login-redirect">
        <p>Have an account? <span className="login-link" onClick={()=>navigate("/login")}>Log in</span></p>
      </div>
    </form>
    <ToastContainer />
    </div>
    
  );
};

export default Signup;
