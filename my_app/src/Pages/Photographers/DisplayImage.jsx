import React, {useContext, useState } from 'react'
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
import { appContext } from '../../App'
import axios from 'axios'
import { apiUrls } from '../../config'
import { toast } from 'react-toastify'




const DisplayImage = ({isOpen, onClose, url, imageId ,imageOwnerId, setRefresh}) => {
    const {userDetails, authToken} = useContext(appContext)

    const closeModal = () => {
        onClose()
      }
    const handleDeleteButton = async () => {

        try{
            axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
            const resJ = await axios.delete(apiUrls.handleAlbumImages, {data:{image_id : imageId}})
            if (resJ.status===200){
                console.log(resJ)
                setRefresh(prev=>prev+1)
                toast.success("תמונה נמחקה בהצלחה")
                onClose()
            }
        }
        catch(error){
            console.log(error)
        }

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
            <MDBModalBody >
            <img src={url} alt="" />

            </MDBModalBody>
            <MDBModalFooter>
            {userDetails && (imageOwnerId == userDetails.id || userDetails?.is_staff === true) &&  
            <MDBBtn color='danger' onClick={handleDeleteButton}>
                מחק
              </MDBBtn>
            }
              <MDBBtn color='secondary' onClick={closeModal}>
                סגור
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
       
    </div>
  )
}

export default DisplayImage