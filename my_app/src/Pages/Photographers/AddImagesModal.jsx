import React, { useContext, useEffect, useState } from 'react'
import {  MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBProgress,
    MDBProgressBar, } from 'mdb-react-ui-kit'
    import axios from 'axios'
    import { apiUrls } from '../../config'
    import Translate from '../../Translate'
import { appContext } from '../../App'
    
const AddImagesModal = ({isOpen, onClose, albumId, setRefresh}) => {
    const {authToken} = useContext(appContext)
    const [errors, setErrors] = useState('')
    const [images, setImages] = useState("")
    const [progressBar, setProgressBar] = useState('')

    useEffect(()=>{
        if (!isOpen){
            setErrors(null)
            setImages(null)
        }
        
      }, [isOpen])

    const handleClose = () => {
        onClose()
    }
    const uploadImages = () => {
      if(images){
        const imageArray = Array.from(images);
        const formData = new FormData()
        imageArray.forEach((file) => {
            formData.append('album_images', file);
          });
          formData.append('album_id', albumId)
        axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
        axios.post(apiUrls.handleAlbumImages, formData, 
            {onUploadProgress:event=>{setProgressBar(Math.round(100 * event.loaded) / event.total)}}
            ).then(resJ =>{
            
            if (resJ.status===200){
                console.log('status 200 uploaded succesfully')
                setRefresh(prev=>prev+1)
                onClose()

            }}
            ).catch(error =>{
                console.log(error)
            }
            )}


    }

  return (
    
    <div>
        
        <MDBModal show={isOpen} onHide={handleClose} closeOnEsc={false} >
      <MDBModalDialog>
          <MDBModalContent style={{height:"40vh"}}>
            <MDBModalHeader>
              <MDBModalTitle>העלאת תמונות</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBInput onChange={(e) => setImages(e.target.files)} type='file' multiple />

                {errors && 
          <p className="modal-error-message">
            <span><Translate errorMessage={errors}/></span> 
          </p>}
          <div>
          <MDBProgress height='20'>
      <MDBProgressBar width='25' valuemin={0} valuemax={100}>
        {progressBar}
      </MDBProgressBar>
    </MDBProgress>
    </div>
    
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn onClick={uploadImages}>העלאה</MDBBtn>
              <MDBBtn color='secondary' onClick={onClose}>
                סגירה
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> 
    </div>
    
  )
}

export default AddImagesModal