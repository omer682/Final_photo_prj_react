import React, { useState, useEffect, useContext} from 'react'
import { appContext } from '../../App'
import {  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  } from 'mdb-react-ui-kit'
import Translate from '../../Translate'
import axios from 'axios'
import { apiUrls } from '../../config'
import { toast } from 'react-toastify'

const AlbumActions = ({id, type, name, photographerId, isOpen, onClose, setRefresh}) => {
    const {userDetails, authToken} = useContext(appContext)
    const [errors, setErrors]= useState('')
    
    useEffect(()=>{
      if (!isOpen){
          setErrors(null)
      }
      
    }, [isOpen])

  const handleClose = () => {
      onClose()
  }

    const handleUpdate = async () => {
      if(!userDetails.is_staff === true || userDetails.id !== photographerId){
        onClose()
        console.log('error')
      }
    }
    const handleDelete = async () => {
      console.log('enter')
      if(userDetails && (!userDetails.is_staff === true || userDetails.id !== photographerId)){
        onClose()
      }
      try{
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      const resJ = await axios.delete(apiUrls.album, {data : {id : id}})
      if (resJ.status===200){
        console.log(resJ)
        toast.success('אלבום נמחק בהצלחה')
        setRefresh(prev=>prev+1)
        onClose()
      }
    }
    catch(error){
      console.log(error)
    }

      

    }

    return (
      <MDBModal show={isOpen} onHide={handleClose} closeOnEsc={false} >
      <MDBModalDialog>
          <MDBModalContent style={{height:"20vh"}}>
            <MDBModalHeader>
              <MDBModalTitle>האם למחוק {type}:
              <b> {name} </b>?
              </MDBModalTitle>
              
              <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

                {errors && 
          <p className="modal-error-message">
            <span><Translate errorMessage={errors}/></span> 
          </p>}
          
    
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='danger' onClick={handleDelete}>מחק</MDBBtn>
              <MDBBtn color='secondary' onClick={onClose}>
                סגור
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> 
  )
}

export default AlbumActions