import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/signup.css'
import axios from 'axios';
const Signup = () => {
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
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .min(5, 'At least 5 characters')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include a special character')
        .required('Password is required'),
    }),
    onSubmit: (val) => {
      try{
        console.log("val",val);
        const res=axios.post('https://chatbackend-ph5y.onrender.com/post',{
          email:val.email,
          password:val.password,
          fullName:val.fullName,
          username:val.username,
          phonenumber:val.phonenumber
        })
        console.log("res",
          res
        );
        
        if(res.data.msg==="signup successfully"){
          alert("you succesfully created account on chatvat")  
        }
      }catch(err){
        alert('Invalid email or password');
      }
    },
  });

  return (
    <div className='signup-container '>
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <h1 className="signup-heading">chatvat</h1>

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
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
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
          onKeyDown={(e) => handleKeyDown(e, phnRef)}
        />


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
        <p>Have an account? <span className="login-link">Log in</span></p>
      </div>
    </form>
    </div>
  );
};

export default Signup;
