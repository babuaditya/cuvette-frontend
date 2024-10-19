import  { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import InputWithIcon from '../stories/Input'; // Assuming InputWithIcon is a custom component
import { Button } from "../stories/Button";
import {submitRegisterForm, verifyEmail, verifyPhone} from '../services/register'
import './Login.css';

const validationRules = {
  name: { required: 'Name is required' },
  phone: { required: 'Phone number is required', pattern: { value: /^[0-9]+$/, message: 'Invalid phone number' } },
  companyName: { required: 'Company name is required' },
  companyEmail: { required: 'Company email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' } },
  employeeSize: { required: 'Employee size is required' },
};

function Login() {
  const navigation = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { control, handleSubmit,watch, formState: { errors } } = useForm();
  const [formShown, setformShown]=useState("reg")
  const [isMobileVerified, setIsMobileVerified]=useState(false)
  const [isEmailVerified, setIsEmailVerified]=useState(false)
  const emailOtp=watch('emailOtp')
  const phoneOtp=watch('mobileOtp')
  useEffect(()=>{
    const user= sessionStorage.getItem('user');
    if(user){
      setformShown("otp")
    }
  })
  if (isAuthenticated) {
    navigation('/dashboard');
  }

  const onSubmit = async(formData) => {
    console.log(formData);
    const {user,error}=await submitRegisterForm(formData);
    
    if(error){
      toast.error("error while submitting form")
    }
    if(user){
      setformShown("otp")
      sessionStorage.setItem('user', JSON.stringify(user));
      toast.success("Email sent to Your Mail")
    }
  };

  const emailVerfication=async ()=>{
    const user= sessionStorage.getItem('user');
    const isVerify=await verifyEmail(JSON.parse(user).userId,emailOtp);
    setIsEmailVerified(isVerify);
  }

  const mobileVerfication=async()=>{
    const user= sessionStorage.getItem('user');
    let isVerify=false
    const cookie=await verifyPhone(JSON.parse(user).userId,phoneOtp);
    if(cookie){
      document.cookie=`authToken=${cookie}`
      isVerify=true;
      navigation('/dashboard')
    }
    setIsMobileVerified(isVerify);
  }

  return (
    <>
    <ToastContainer/>
    <div className="registration-form">
      <h1 className="registration-form--heading">Sign Up</h1>
      <p className="registration-form--paragraph">
        Lorem Ipsum is simply dummy text
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-10">
        {formShown==="reg"&& (
          <>
            <div className="form-reg">
              <Controller
                name="name"
                control={control}
                rules={validationRules.name}
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Name"
                    svg="./assets/person.svg"
                    {...field}
                  />
                )}
              />
              {errors.name && <span className="error-message">{String(errors?.name?.message)}</span>}
            </div>
            <div className="form-reg">
              <Controller
                name="phone"
                control={control}
                rules={validationRules.phone}
                render={({ field }) => (
                  <InputWithIcon
                    type="number"
                    placeholder="Phone No"
                    svg="./assets/phone.svg"
                    {...field}
                  />
                )}
              />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}
            </div>
            <div className="form-reg">
              <Controller
                name="companyName"
                control={control}
                rules={validationRules.companyName}
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Company Name"
                    svg="./assets/person.svg"
                    {...field}
                  />
                )}
              />
              {errors.companyName && <span className="error-message">{errors.companyName.message}</span>}
            </div>
            <div className="form-reg">
              <Controller
                name="companyEmail"
                control={control}
                rules={validationRules.companyEmail}
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Company Email"
                    svg="./assets/mail.svg"
                    {...field}
                  />
                )}
              />
              {errors.companyEmail && <span className="error-message">{errors.companyEmail.message}</span>}
            </div>
            <div className="form-reg">
              <Controller
                name="employeeSize"
                control={control}
                rules={validationRules.employeeSize}
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Employee Size"
                    svg="./assets/group.svg"
                    {...field}
                  />
                )}
              />
              {errors.employeeSize && <span className="error-message">{errors.employeeSize.message}</span>}
            </div>
            <h1 className="registration-form-tc">
              By clicking on proceed you will accept our<br />
              <span>Terms</span> & <span>Conditions</span>
            </h1>
            <Button type="submit" label="Sign Up" primary />
          </>
        )}
        {formShown==="otp" && (
          <>
            <div className="form-reg">
              <Controller
                name="emailOtp"
                control={control}
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Email OTP"
                    svg="./assets/mail.svg"
                    {...field}
                    disabled={isEmailVerified}

                  />
                )}
              />
              
              {errors.emailOtp && <span className="error-message">{errors.emailOtp.message}</span>}
              
            </div>
            {isEmailVerified?null:<Button onClick={emailVerfication} label="Verify" primary/>}
            <div className="form-reg">
              <Controller
                name="mobileOtp"
                control={control}
                
                render={({ field }) => (
                  <InputWithIcon
                    type="text"
                    placeholder="Mobile OTP"
                    svg="./assets/phone.svg"
                    disabled={isMobileVerified}
                    {...field}
                  />
                )}
              />
            
              {errors.mobileOtp && <span className="error-message">{errors.mobileOtp.message}</span>}
            </div>
            {isMobileVerified?null:<Button onClick={mobileVerfication} label="Verify" primary/>}
          </>
        )}
      </form>
    </div>
    </>
  );
}

export default Login;
