import { Outlet, useNavigate ,Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './unauthenticated.css'
import { useEffect } from 'react';
import {getCookie} from '../utils/getCookie'
const UnauthenticatedLayout = () => {
  const { isAuthenticated,login } = useAuth();
  const navigation = useNavigate();

  useEffect(()=>{
    const authToken = getCookie('authToken');
    if(authToken){
      login();
      navigation('/dashboard')
      // Navigate({replace:true , to:'/dashboard'})
      
    }
    // console.log('Auth Token:', authToken);
  },[])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="unauthenticated-layout">
      <header className='unauthenticated-layout--header'>
      <div className='unauthenticated-layout--header_logo'>
      <img src="https://cuvette.tech/assets/images/cuvette.svg"
      height={"165px"}
      width={"100px"}
      />
      </div>
      <div className='unauthenticated-layout--header_contact'>
        <h1>Contact</h1>
        </div>
      </header>
      <main className='unauthenticated-layout--main'>
        <div className="unauthenticated-layout--paragraph">
          <p>
          Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
          </p>
        
        </div>
        <Outlet />
      </main>
      <footer className='unauthenticated-layout--footer'/>
    </div>
  );
};

export default UnauthenticatedLayout;
