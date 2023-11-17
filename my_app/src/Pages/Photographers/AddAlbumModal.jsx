import React, {useContext, useState } from 'react'
import {  MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput, } from 'mdb-react-ui-kit'
import axios from 'axios'
import { apiUrls } from '../../config'
import { toast } from 'react-toastify'
import Translate from '../../Translate'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../../App'



  
const AddAlbumModal = ({isOpen, onClose, setRefresh}) => {
  const nav = useNavigate()
  const [newAlbum, setNewAlbum] = useState("")
  const [errors, setErrors] = useState('')
  const {authToken} = useContext(appContext)
    
    
    const closeModal = () => {
      setErrors('')
      setNewAlbum('')
      onClose()
    }

    const addNewAlbum = async () => {
        if(newAlbum.length > 1 && newAlbum.length < 16){
          
        try{
        axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
        const resJ = await axios.post(apiUrls.album, {name : newAlbum})
        if (resJ.status === 200){
          toast.success('אלבום נוסף בהצלחה')
          setRefresh(prev=>{return prev+1})
          onClose()
        }
        setErrors("")
        setNewAlbum("")
      }
      catch(error){
        if(!error?.response){
          setErrors('שירות לא זמין כעת')
        }
        else if (error.response){
          setErrors(error.response.data.message)
          console.log(error)
          
        }
      }
    
    }
    else{ setErrors('שם האלבום יכול להכיל בין 2 ל 15 תווים')}
  }
  return (
    <div>
        <MDBModal show={isOpen} onHide={onClose}>
      <MDBModalDialog>
          <MDBModalContent>
          
            <MDBModalHeader>
              <MDBModalTitle>הוספת אלבום</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBInput label="שם האלבום" value={newAlbum} onChange={(e)=>{setNewAlbum(e.target.value)}} />
                {errors?.name && 
          <p className="modal-error-message">
            <span><Translate errorMessage={errors.name}/></span> 
          </p>
         
          }
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={addNewAlbum}  >הוספת אלבום</MDBBtn>
              <MDBBtn color='secondary' onClick={closeModal}>
                סגירה
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default AddAlbumModal