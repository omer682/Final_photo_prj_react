import axios from 'axios'
import './photographers.css'
import { MDBBtn, MDBInput, MDBRipple } from 'mdb-react-ui-kit'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrls, avatars } from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@chakra-ui/react'
import AddImagesModal from './AddImagesModal'
import { appContext } from '../../App'
import DisplayImage from './DisplayImage'

const AlbumImages = () => {
    const {id} = useParams()
    const nav = useNavigate()
    const {userDetails} = useContext(appContext)
    const [photographerData, setPhotographerData] = useState("")
    const [albumData, setAlbumData] = useState("")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const displayDisclosure = useDisclosure()
    const [refresh, setRefresh] = useState(1)
    const [imageManager, setImageManger] = useState({})

    useEffect(()=>{
      
        axios.get(apiUrls.albumImages, {params:{id:id}}).then((resJ)=>{
          if(resJ.status===200){
            setPhotographerData(resJ.data.data.user_data)
            setAlbumData(resJ.data.data.album_images)
          }
        }).catch((error)=>{
          console.log(error)
        })
          },[refresh])


    const handleImageClick = (url, imageId) => {
      setImageManger({url : url,
                      imageId : imageId})
      displayDisclosure.onOpen()
    }

    

  return (
    <div>
    
        <DisplayImage isOpen={displayDisclosure.isOpen} onClose={displayDisclosure.onClose} url={imageManager.url} imageOwnerId={photographerData.id}
         imageId={imageManager.imageId} setRefresh={setRefresh}/>
        {userDetails && <AddImagesModal isOpen={isOpen} onClose={onClose} albumId={id} setRefresh={setRefresh}/>}
        <div className='profile-bg-image d-flex justify-content-center align-items-center' style={{backgroundImage: `url(${(photographerData.bg ? photographerData.bg 
          : "https://images.pexels.com/photos/16105526/pexels-photo-16105526/free-photo-of-people-walking-with-israel-flag-on-shoulders.jpeg?auto=compress&cs=tinysrgb&w=1600")})`}}> 
        <div className='profile-display-user' style={{color:"white"}}>
        <div className='profile-first-row'>

          <div style={{}}>
        {photographerData &&<>  <p className='m-4' > הצטרף בתאריך :
          {new Date(photographerData.date_joined).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' })}</p>

       <p className='m-4' >
        רשתות חברתיות
       </p></>}
       
            
          </div>
      {photographerData && <><div>
      <div className='text-center profile-name' >    
      {photographerData.first_name} {photographerData.last_name}</div>
      
      {photographerData.city && 
      <div><FontAwesomeIcon icon={faLocationDot} className='mx-2' color='blue'/>
      {photographerData.city} </div>}
      </div>
          <div>  
      <img src={photographerData?.image ? photographerData.image : (photographerData.gender === "female" ? avatars.femaleImage1 : avatars.maleImage1)} 
      className='profile-image' style={{border:(photographerData?.image && "solid white 2px"), marginRight:"auto"}} 
      /></div></>}

      </div>
      <div className='profile-bio mt-4 text-center'>
        {photographerData.bio && <div className='d-flex justify-content-center flex-column align-items-center'>
          <p className=''> ביוגרפיה</p>
          <hr className='mb-2 w-50'/>
          <p> {photographerData.bio}</p>
            </div>} 
      </div>
      </div>
      </div>


      <div className='m-4'>
      <MDBBtn onClick={()=>{nav(`/photographers/profile/${photographerData.id}`)}} outline color='dark' style={{display:"block"}}>
        חזרה לעמוד הקודם
        </MDBBtn>
      </div>

      <div className='m-4'>
            <div className='albums-title text-center mb-4'> תמונות </div>
            {userDetails?.id == photographerData.id && <MDBBtn color='dark' style={{display:"block", marginRight:"10vh"}} onClick={onOpen}>
                                      העלאת תמונות</MDBBtn>}
      <div className='images'>
            {albumData && albumData.map((album)=>(<div className='image-container bg-image hover-overlay hover-zoom hover-shadow'
             key={album.image_id}
             onClick={()=>{handleImageClick(album.image_url, album.image_id)}}
             >
            <img src={`${album.image_url}`} className='image-sizing' alt='photographer-image' />
            <div className='mask' style={{ backgroundColor: 'rgba(57, 192, 237, 0.2)' }}></div>
              
              </div>))}
            
            
              
            
            </div>
        
      </div>


      
    </div>
  )
}

export default AlbumImages