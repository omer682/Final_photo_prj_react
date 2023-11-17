import { MDBBtn, MDBFile, MDBInput, MDBTextArea } from 'mdb-react-ui-kit'
import React, { useContext, useState } from 'react'
import { appContext } from '../../App'
import './edituser.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { apiUrls } from '../../config'
import Translate from '../../Translate'
import { toast } from 'react-toastify'


const EditUser = () => {
    const {userDetails, authToken} = useContext(appContext)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [gender, setGender] = useState("")
    const [city, setCity] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image, setImage] = useState("")
    const [editErrors, setEditErrors] = useState("")

    const handleForm = async (e) => {
        e.preventDefault()
        setEditErrors('')
        
        let newData = {
            ...(firstName && { first_name : firstName }),
            ...(lastName && { last_name : lastName }),
            ...(bio && { bio : bio }),
            ...(gender && { gender : gender }),
            ...(city && { city : city }),
            ...(phoneNumber && { phone_number : phoneNumber }),
        }
        if (image){
        const formData = new FormData();
         formData.append("image", image)
         if (newData){
         Object.entries(newData).map(([key, value])=>(formData.append(key, value)))
         }
         newData = formData
        }

       
        try{
            axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
            const resJ = await axios.put(apiUrls.user, newData)
            console.log(resJ)
        }
    
    catch(error){
        if(!error?.response){
            toast.error('אין אפשרות להתחבר כעת')
        }
        else if(error.response?.data){
            setEditErrors(error.response.data.errors)
            console.log(error)
            console.log(editErrors, 'from editerrors')
        }
        else{
            toast.error("ההתחברות נכשלה",{position:"top-center"})
        }
    }
    }

    return (
        <div className='d-flex flex-column align-items-center'>
        <p  className='mb-5 title'> עריכת פרטי משתמש </p>
        <div className='m-4 form-div'>
            {userDetails && <form encType='multipart/form-data' onSubmit={handleForm}>
                <div className="d-flex flex-row">
                <div className='w-50'>

                <div className='my-4'>
                <MDBInput  onChange={(e)=>{setEmail(e.target.value)}} defaultValue={userDetails.email} label="אימייל" type='email' disabled/>
                {editErrors?.email && <p className='login-errors'>{<Translate errorMessage={editErrors.email}/>}</p>}
                </div>
                
                <div className='my-4'>
                <MDBInput onChange={(e)=>{setFirstName(e.target.value)}} defaultValue={userDetails.first_name} label="שם פרטי"/>
                {editErrors?.first_name && <p className='login-errors'>{<Translate errorMessage={editErrors.first_name}/>}</p>}
                </div>
                <div className='my-4'>
                <MDBInput  onChange={(e)=>{setLastName(e.target.value)}} defaultValue={userDetails.last_name} label="שם משפחה" />
                {editErrors?.last_name && <p className='login-errors'>{<Translate errorMessage={editErrors.last_name}/>}</p>}
                </div>
                
                <div className='my-5'>
                <MDBInput  onChange={(e)=>{setBio(e.target.value)}} defaultValue={userDetails.bio} label="ביוגרפיה" maxLength={150}/>
                {editErrors?.bio && <p className='login-errors'>{<Translate errorMessage={editErrors.bio}/>}</p>}
                <p style={{fontSize:"8px"}} className='mx-2'>מידע זה יופיע בעמוד הצילום הראשי שלך</p>
                </div>

            <div className='my-4'>
            <MDBInput  onChange={(e)=>{setPhoneNumber(e.target.value)}} defaultValue={userDetails.phone_number} label="מס פלאפון"/>
            {editErrors?.phone_number && <p className='login-errors'>{<Translate errorMessage={editErrors.phone_number}/>}</p>}
            </div>

            <div className='my-4'>
                <MDBInput onChange={(e)=>{setCity(e.target.value)}} defaultValue={userDetails.city} label="עיר/יישוב" />
                {editErrors?.city && <p className='login-errors'>{<Translate errorMessage={editErrors.city}/>}</p>}
            </div>

            <div className='my-4'>             
                <Form.Select className='' onChange={(e)=>{setGender(e.target.value)}} defaultValue={userDetails.gender && userDetails.gender}>
          <option value={null}> בחר מין</option>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
            </Form.Select>
            </div> 
            </div>
            

                <div  style={{marginRight:"auto"}} className='my-4'>
            <MDBFile label={userDetails?.image ? "החלף תמונת פרופיל" : "העלה תמונת פרופיל"} id='customFile' 
            className='w-75'
            onChange={(e)=>{setImage(e.target.files[0])}} />
            {editErrors?.image && <p style={{color: "red", maxWidth:"40vh"}}>{<Translate errorMessage={editErrors.image}/>}</p>}
            {userDetails?.image && <div> 
                <img src={userDetails.image} alt="" width={100} height={100} style={{border:"solid black 1px"}}/>
                </div>}
                
                </div>

                </div>
                <div className='d-flex justify-content-center'>
            <MDBBtn outline type='submit'>שמור שינויים</MDBBtn>
            
            </div>
            
                </form>}          
            
            
               
        </div>
       
    </div>
  )
}

export default EditUser