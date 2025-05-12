import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/login.css'
import loginlogo from '../assets/Cv.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../assets/instagram-web-lox-image-2x.png';



const LogIn = () => {
//   // const location = useLocation();
//   // // const { state } = location;
//   // const initialEmail = location.state?.email || '';
//   // const logoutMessage = location.state?.logoutMessage || '';
  const [showPassword, setShowPassword] = useState(false);
//C7k+C3k+G1100(G800+G300)+C2k(C800+200+C750+C1200)-50+C2140(C630+C50+C1400+C60)
//C13100+C2140 C15240

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
    }),
        onSubmit :async(values) => {
          try{
    const response=await axios.post('http://localhost:2020/login',{
      email:values.email,
      password:values.password,
    })
    // console.log("response",response.data.gameId);
    // console.log("res",response)
    // console.log(response.data.msg); 
    // console.log("name",response.data.Name);
    
    if(response.data.msg==='login successfully'){
      alert("you succesfully logedin")  
    }
    if(response.data.Name){
    navigate("/chatvat",{state:{name:response.data.Name,email: values.email ,access:response.data.access,id:response.data.gameId }})}
    if(response.status===200 && response.data.msg==="login successfully" ){
      navigate("/frontend/src/Components/Dashboard/About.jsx")
        }
      } catch(err){
      alert('Invalid email or password');
    }
        },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


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
            <button className='btnlogin' onSubmit={formik.handleSubmit} > logIn</button>
            <div className="separator">
                <span>OR</span>
            </div>
            <p className='account'>Forgot your login details? <Link to='/forgetPassword' className='mt-3' onClick={() => navigate('/forgetPassword')}>
              Reset your password?
            </Link> </p>
            <p className='or'>OR</p>
            <div className='d-flex' >
            <p className='dont'>Don't have an account?</p>
            <p className='signup' onClick={() => navigate("/signUp")}>Sign Up</p>
            </div>
          </form>
        </div >

        <p  className="custom-footer">Meta
About Help Privacy Terms Contact Uploading & Non-Users   A.S Verified
</p>
  <p className="custom-footer">
        English  © 2025 ChatVat from AshuWorld
</p>
        </div>
  );
};
export default LogIn;