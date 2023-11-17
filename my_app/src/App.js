import './App.css';
import "react-toastify/dist/ReactToastify.css"
import 'mdb-react-ui-kit/dist/css/mdb.rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Navbar from './Components/Navbar';
import SiteRoutes from './SiteRoutes';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrls} from './config';
import {ToastContainer, toast } from 'react-toastify'

export const appContext = createContext(null)

function App() {
  const [authToken, setAuthToken] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

 
  useEffect(()=>{

      const isToken = localStorage.getItem('auth-token') || authToken || null
      if(isToken){
          axios.defaults.headers.common['Authorization'] = `Token ${isToken}`;
          axios.get(apiUrls.checkToken)
                  .then((resJ) => {
                    if (resJ.status === 200){
                  setAuthToken(isToken)
                  setUserDetails(resJ.data.user_details)
      }})
      .catch((error) => {  
    if (error.response) {
      // The request was made, but the server responded with an error status code (e.g., 404)
      localStorage.removeItem('auth-token')
      console.error(`Request failed with status code ${error.response.status}`);
      console.error(error.response.data);
    } else if (error.request) {
      toast.error('לא ניתן להתחבר כעת')
      console.error('No response received from the server');
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }})}}, [authToken])


  return (
    <div>
      <ToastContainer rtl/>
      <appContext.Provider value={{authToken, setAuthToken, userDetails, setUserDetails}}>
      {/* <div style={{height:"6rem", backgroundColor:"gray", display:"flex", justifyContent:"center", fontSize:"3rem"}}> כאן יהיה לוגו</div> */}
      <Navbar />
      <SiteRoutes/>
      </appContext.Provider>
     
      
      
      
    </div>
  );
}

export default App;
