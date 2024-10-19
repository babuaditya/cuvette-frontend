import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './authenticated.css'
const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="authenticated-layout">
      <header className="authenticated-layout--header">
      <div className='authenticated-layout--header_logo'>
      <img src="https://cuvette.tech/assets/images/cuvette.svg"
      height={"165px"}
      width={"100px"}
      />
      </div>
      <div className='authenticated-layout--header_contact'>
        <h1>Contact</h1>
        {/* <div className=''>
          <select>
          <option>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
          Aditya
          </option>
          <option>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
          Aditya
          </option>
          </select>
     
        </div> */}
        </div>
      </header>

      <main className="authenticated-layout--container">
        <nav className="authenticated-layout--sidenav pt-10 py-10">
          <ul>
            <li className="authenticated-layout--sidenav_item">
              <span><svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9034 33.6513V28.1565C11.9033 26.7641 13.0356 25.6329 14.438 25.6241H19.5876C20.9963 25.6241 22.1383 26.7579 22.1383 28.1565V33.6354C22.1383 34.843 23.1197 35.8245 24.3361 35.8333H27.8494C29.4902 35.8375 31.0653 35.1933 32.227 34.0429C33.3888 32.8925 34.0417 31.3304 34.0417 29.7014V14.093C34.0417 12.7771 33.4541 11.5289 32.4374 10.6846L20.502 1.20806C18.4157 -0.449489 15.4359 -0.395944 13.4113 1.33548L1.73256 10.6846C0.667827 11.504 0.0314479 12.7559 0 14.093V29.6855C0 33.0808 2.77239 35.8333 6.19231 35.8333H9.62535C10.211 35.8375 10.7742 35.6095 11.1898 35.1998C11.6054 34.7902 11.8392 34.2328 11.8392 33.6513H11.9034Z" fill="#576474"/>
</svg>
</span>
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
