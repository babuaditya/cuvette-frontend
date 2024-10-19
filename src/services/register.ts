// src/services/register.ts
import axiosInstance from '../utils/axios';
import { getCookie } from '../utils/getCookie';


// Function to submit the registration form
export async function submitRegisterForm(formData) {

    try {
        const response = await axiosInstance.post('/auth/register', formData);
        console.log('Registration successful:', response.data);
        return { user: response.data, error: null };
      } catch (error) {
        console.error('Error registering:', error);
        return { user: null, error: error.response ? error.response.data : 'An unknown error occurred' };
      }
}
export async function verifyEmail(userId,emailOtp) {
    try {
        const response = await axiosInstance.post('/auth/verify-email', {userId,emailOtp});
        console.log('Registration successful:', response.data);
        if(response.data.token){

            return true;
        }
      } catch (error) {
        console.error('Error registering:', error);
        return false;
      }
}
export async function verifyPhone(userId,phoneOtp) {
    try {
        const response = await axiosInstance.post('/auth/verify-phone', {userId,phoneOtp}, { withCredentials: true });
        console.log('Registration successful:', response.data);
        if(response.data.token){

            return response.data.cookie;
        }
      } catch (error) {
        console.error('Error registering:', error);
        return false;
      }
}

export async function getProfile() {
    try {
      const authToken = getCookie('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }
  
      const response = await axiosInstance.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true, // Include credentials such as cookies
      });
  
      console.log('Profile data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { error: error.response ? error.response.data : 'An unknown error occurred' };
    }
  }

  export async function sendEmail(forms,companyName) {
    console.log( "kdj")
    try {
      const authToken = getCookie('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }
      const {jobTitle,jobDescription,experienceLevel,endDate,candidateEmails}=forms
      const candidatesEmailArray = candidateEmails.map(data => data.email);
      console.log("babu")
      console.log(candidatesEmailArray)
      const response = await axiosInstance.post(
        '/mail/send-email',
        {
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          experience: experienceLevel,
          endDate: endDate,
          candidatesEmails:candidatesEmailArray,
          companyName:companyName
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true, // Include credentials such as cookies
        }
      );
  
      console.log('Email sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      return { error: error.response ? error.response.data : 'An unknown error occurred' };
    }
  }
