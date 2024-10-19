import { useState,useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getProfile,sendEmail } from '../services/register';
import './Dashboard.css'; // Assuming you have a CSS file for additional styles

const validationRules = {
  jobTitle: { required: 'Job Title is required', maxLength: { value: 60, message: 'Job Title cannot exceed 60 words' } },
  jobDescription: { required: 'Job Description is required', maxLength: { value: 1000, message: 'Job Description cannot exceed 1000 words' } },
  experienceLevel: { required: 'Experience Level is required' },
  endDate: { required: 'End Date is required' },
  candidateEmail: { required: 'Candidate Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' } },
};

const Dashboard = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [user,setUser]=useState()

  useEffect(()=>{
    async function fetch(){
      const data=await getProfile();
      // const ddingChick=await sendEmail();
      // console.log(ddingChick)
      setUser(data);  
    }
    fetch()
  },[])
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidateEmails'
  });

  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  const onSubmit = async(data) => {
    console.log(data);
    console.log(user);
    await sendEmail(data,user.data.companyName);
    console.log()
    // Handle form submission
  };

  const handleAddEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailInput && emailPattern.test(emailInput)) {
      append({ email: emailInput });
      setEmailInput('');
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Shift') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="container  p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label className=" text-sm font-medium text-gray-700">Job Title</label>
          <Controller
            name="jobTitle"
            control={control}
            rules={validationRules.jobTitle}
            render={({ field }) => (
              <input
                type="text"
                className="mt-1  w-full rounded-md text-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter Job Title"
                {...field}
              />
            )}
          />
          {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle.message}</span>}
        </div>

        <div className="form-group">
          <label className=" text-sm font-medium text-gray-700">Job Description</label>
          <Controller
            name="jobDescription"
            control={control}
            rules={validationRules.jobDescription}
            render={({ field }) => (
              <textarea
                className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={8}
                placeholder="Enter Job Description"
                {...field}
              />
            )}
          />
          {errors.jobDescription && <span className="text-red-500 text-sm">{errors.jobDescription.message}</span>}
        </div>

        <div className="form-group">
          <label className=" text-sm font-medium text-gray-700">Experience Level</label>
          <Controller
            name="experienceLevel"
            control={control}
            rules={validationRules.experienceLevel}
            render={({ field }) => (
              <select
                className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue=""
                {...field}
              >
                <option value="" disabled>Select Experience Level</option>
                <option value="fresher">Fresher</option>
                <option value="intermediate">Intermediate</option>
                <option value="mid-senior">Mid-Senior</option>
                <option value="senior">Senior</option>
              </select>
            )}
          />
          {errors.experienceLevel && <span className="text-red-500 text-sm">{errors.experienceLevel.message}</span>}
        </div>

        <div className="form-group">
          <label className=" text-sm font-medium text-gray-700">End Date</label>
          <Controller
            name="endDate"
            control={control}
            rules={validationRules.endDate}
            render={({ field }) => (
              <input
                type="date"
                className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Select a date"
                {...field}
              />
            )}
          />
          {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
        </div>

        <div className="form-group">
          <label className=" text-sm font-medium text-gray-700">Candidate Emails</label>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyUp={handleKeyPress}
              className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add candidate email"
            />
            {/* <button type="button" onClick={handleAddEmail} className="text-blue-500">Add</button> */}
          </div>
          {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          <div className="mt-2 flex flex-wrap">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 bg-gray-200 rounded-full px-3 py-1 m-1">
                <Controller
                  name={`candidateEmails[${index}].email`}
                  control={control}
                  rules={validationRules.candidateEmail}
                  render={({ field }) => (
                    <>
                    <span className="text-sm">{field.value}</span>
                    <button type="button" onClick={() => remove(index)} className="text-red-500">x</button>
                    </>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center ml-[200px]">
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
