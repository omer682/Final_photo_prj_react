import React, { useContext, useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import './loginandregister.css'
import {Link} from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import { toast } from 'react-toastify';
import { appContext } from '../../App';
import { apiUrls } from '../../config';
import Translate from '../../Translate';



const LoginAndRegisterModal = ({isOpen, onClose}) => {
const [justifyActive, setJustifyActive] = useState('tab1');
const {setAuthToken, setUserDetails} = useContext(appContext)
const today = new Date().toISOString().split('T')[0];


// registeration states -
const [options, setOptions] = useState([])
const [registerEmail, setRegisterEmail] = useState('')
const [registerPassword, setRegisterPassword] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [age, setAge] = useState('')
const [city, setCity] = useState('')
const [registerErrors, setRegisterErrors] = useState()
// login states - 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loginErrors, setLoginErrors] = useState()


  

  useEffect(()=>{
    if (!isOpen){
        setLoginErrors(null)
        setRegisterErrors(null)
    }
    
  }, [isOpen])


const handleLogin = async (event) => {
  event.preventDefault()
  if (password && email){
    await new Promise((resolve) => setTimeout(resolve, 500));
    const loginData = {
      email : email,
      password : password}
    
    try{
    const resJ = await axios.post(apiUrls.login, loginData);

    if (resJ.status === 200){
        localStorage.setItem('auth-token', resJ.data.token)
        setAuthToken(resJ.data.token)
      onClose()
    }

    
    }
    catch(error){
      if (!error?.response){
        toast.error('אין אפשרות להתחבר כעת')
        onClose()

      }
    else if(error.response?.data){
        setLoginErrors(error.response.data)
        console.log(error)
    }
    else{
        toast.error("ההתחברות נכשלה",{position:"top-center"})
    }
    }
    
  }}

 

  const handleRegistration = async (event) => {
    event.preventDefault()
    if (registerEmail && registerPassword && firstName && lastName){
      const registerData = {
        email : registerEmail,
        password : registerPassword,
        first_name : firstName,
        last_name : lastName,
        birth_date : age,
        ...(city && { city: city })
      }
      try{
      const resJ = await axios.post(apiUrls.signup, registerData);
      if (resJ.status === 201){
      localStorage.setItem('auth-token', resJ.data.token);
      setAuthToken(resJ.data.token);
      toast.success(`נשרמת בהצלה! ברוך הבאה ${resJ.data.user_details.first_name}`);
      onClose();
    }
      }
      catch(error){
        if (!error?.response){
          toast.error('אין אפשרות להרשם כעת')
          onClose()
        }
        else if(error.response?.data?.error_message){
          console.log(error)
          setRegisterErrors(error.response.data.error_message)

        } 
        else{
          toast.error("ההרשמה נכשלה",{position:"top-center"})
          console.log(error)
      }     
      }
    }

    
  }
const handleChange = async (selectOption) => {
  setCity(selectOption.label)
}  

const loadOptions = async (searchValue, callback) => {
  if (searchValue.length >= 3) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=9&q=${searchValue}`;
    
    try {
      const resJ = await axios.get(url);
      if (resJ.status === 200) {
      let newLst = [];
      for (let i = 0; i < resJ.data.result.records.length; i++) {
        newLst.push({
          value: `object${i}`,
          label: resJ.data.result.records[i].city_name_he,
        });
      
      }
      
      setOptions(newLst);
      const filteredOptions = newLst.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );

      callback(filteredOptions);
    }
    }catch (error) {
      console.error(error);
    }
  }};


  
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    };
  
    return (
        
        <MDBModal show={isOpen} onHide={onClose}  >
            
          
          <MDBModalBody style={{direction:"rtl", fontFamily:"sans-serif"}}>
          
           
              


                  <MDBContainer className={"p-3 my-5 d-flex flex-column container-width"} style={{backgroundColor:"white", color:"black"}} >
            
            
            
            <div dir="ltr">      
                  <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
           </div>
        <MDBTabs pills justify className='mb-4 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              התחברות
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                הרשמה
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
  
        <MDBTabsContent>
  
          <MDBTabsPane show={justifyActive === 'tab1'}>
  
            <div className="text-center mb-3">
              <p>התחבר באמצעות:</p>
  
              <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
              </div>
  
              <p className="text-center mt-3" >או:</p>
            </div>
            <form  onSubmit={handleLogin}>
            {loginErrors?.non_field_errors && <div><p className='login-errors' style={{textAlign:"center"}}>{<Translate errorMessage={loginErrors?.non_field_errors}/>}</p><br/><br/></div>}

            {loginErrors?.email && <p className='login-errors' style={{textAlign:"center"}}>{<Translate errorMessage={loginErrors?.email}/>}</p>}
            <MDBInput wrapperClass='mb-4' label='כתובת אימייל' id='form1' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required={true} maxLength={100}/>
            
            {loginErrors?.password && (<p className='login-errors' >{<Translate errorMessage={loginErrors?.password}/>}</p>)}
            <MDBInput wrapperClass='mb-4' label='סיסמה' id='form2' type='password'value={password} onChange={(e)=>{setPassword(e.target.value)}} required={true}/>
            
            
            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value=''  label='זכור אותי' />
              
              <Link to='/home' >שכחתי סיסמה</Link>
            
              
            </div>
            
            <MDBBtn className="mb-4 w-100" type='submit'>התחברות </MDBBtn>
            </form>

            
  
          </MDBTabsPane>
  
          <MDBTabsPane show={justifyActive === 'tab2'}>
  
            <div className="text-center mb-3">
              <p>הרשמה באצעות:</p>
  
              <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
  
                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
              </div>
  
              <p className="text-center mt-3">או:</p>
            </div>
            <form onSubmit={handleRegistration}>
            {registerErrors?.email && <p className='login-errors'>{<Translate errorMessage={registerErrors.email}/>}</p>}
            <MDBInput wrapperClass='mb-4' label='כתובת אימייל' id=''  style={registerErrors?.email && {color:"red"}}type='email'  required={true} value={registerEmail} onChange={(e)=>{setRegisterEmail(e.target.value)}}/>
            {registerErrors?.password && <p className='login-errors'>{<Translate errorMessage={registerErrors.password}/>}</p>}
            <MDBInput wrapperClass='mb-4' label='סיסמה'  style={registerErrors?.password && {color:"red"}} type='password' required={true} value={registerPassword} onChange={(e)=>{setRegisterPassword(e.target.value)}}/>  
            {registerErrors?.first_name && <p className='login-errors'>{<Translate errorMessage={registerErrors.first_name}/>}</p>}
            <MDBInput wrapperClass='mb-4' label='שם פרטי' style={registerErrors?.first_name && {color:"red"}} type='text' required={true}  value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            {registerErrors?.last_name && <p className='login-errors'>{<Translate errorMessage={registerErrors.last_name}/>}</p>}
            <MDBInput wrapperClass='mb-4' label='שם משפחה'  type='text' style={registerErrors?.last_name && {color:"red"}} required={true} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            

            {registerErrors?.birth_date && <p className='login-errors'>{<Translate errorMessage={registerErrors.birth_date}/>}</p>}
           <MDBInput wrapperClass='mb-4' type='date' label='תאריך לידה'  style={registerErrors?.birth_date && {color:"red"}} min={"1900-01-01"} max={today} required={true} id='div1' value={age} onChange={(e)=>{setAge(e.target.value)}}/>
           
           <div>  
           {registerErrors?.city && <p className='login-errors'>{<Translate errorMessage={registerErrors.city}/>}</p>}
            <AsyncSelect  loadOptions={loadOptions} onChange={handleChange}  placeholder='חפש עיר / יישוב'/>
            
            </div>
            <div className='d-flex justify-content-center mb-4'>
              <p>קראתי ואני מסכים<Link to='/terms' target='_blank' style={{color:"blue"}}> לתנאים </Link></p>
              <MDBCheckbox name='flexCheck'  required={true}></MDBCheckbox>
            
            </div>
  
            <MDBBtn className="mb-4 w-100"  type='submit'>הרשמה</MDBBtn>
            </form>
          </MDBTabsPane>
  
        </MDBTabsContent>
      </MDBContainer>
 
      
      </MDBModalBody>
      </MDBModal>
    );
  }

export default LoginAndRegisterModal;