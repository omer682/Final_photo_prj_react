import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrls, avatars } from '../../config'
import './photographers.css'
import { Menu, MenuItem, MenuList, useDisclosure, MenuButton, IconButton} from '@chakra-ui/react'
import AddAlbumModal from './AddAlbumModal'
import { appContext } from '../../App'
import RateUser from '../../Components/rateUser/RateUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { MDBBtn } from 'mdb-react-ui-kit'
import {DeleteIcon, EditIcon, RepeatIcon, HamburgerIcon} from '@chakra-ui/icons'
import AlbumActions from './AlbumActions'
const PhotographerProfile = () => {
    const nav = useNavigate()
    const {id} = useParams()
    const {authToken, userDetails} = useContext(appContext)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const deleteDisclosure = useDisclosure()
    const [photographerData, setPhotographerData] = useState("")
    const [userRating, setUserRating] = useState("")
    const [albumManger, setAlbumManger] = useState({})
    const [refresh, setRefresh] = useState(1)
    
    useEffect(()=>{
        if (isNaN(id)){
            nav('/404')}
            let params= {}
            if (userDetails){
              params = {params : 
                {id:id,
            user_rating : userDetails.id} 
              }}
            else{
              params = {params : 
                {id:id,}}
            }
              try{ 
        axios.get(apiUrls.getPhotographers, params).then((resJ)=>{
            if(resJ.status===200){
            setPhotographerData(resJ.data.data)
            setUserRating(resJ.data.user_rating)
            }
        })}   
      catch(error){
        console.log(error)
       }
    },[userDetails, refresh, id])   

    const handleAlbumClick = (album_id) => {
      nav(`/photographer/album/${album_id}`)
    }

    const handleRemoveAlbum = (albumId, albumName) => {
      
      setAlbumManger({id:albumId,
                      type:"אלבום",
                    name : albumName,
                   photographerId : photographerData.id})
      deleteDisclosure.onOpen()
                    }

  return (
    <div>
      
      {userDetails && userDetails?.id==id && <AddAlbumModal isOpen={isOpen} onClose={onClose} setRefresh={setRefresh}/>}
      {userDetails && (userDetails?.id==id || userDetails?.is_staff === true) && <AlbumActions isOpen={deleteDisclosure.isOpen} 
      onClose={deleteDisclosure.onClose} setRefresh={setRefresh} id={albumManger.id} type={albumManger.type} name={albumManger.name} photographerId={albumManger.photographerId}/>}
           
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
        {userDetails && userDetails?.id != id && userRating === false &&
      <div className='m-5 rate-user-div'>
        <p className='mx-4' style={{color:"gold"}}> 
        דרג משתמש:
        </p>
        
       <RateUser ratedUser={id} setUserRating={setUserRating}/>
       </div>}
        
       <div className='m-4'>
      <MDBBtn onClick={()=>{nav("/photographers")}} outline color='dark' style={{display:"block"}}>
        חזרה לעמוד הקודם
        </MDBBtn>
      </div>

          <div className='m-4'>
            <div className='albums-title text-center mb-4'>
אלבומים
            </div>
            <div className='albums'>



            {photographerData && photographerData.albums && photographerData.albums.map((album)=>(
            <div className='album-container'
            key={album.id}>        
              <div className='album-title'>
              {/* {userDetails.id == id || userDetails.is_staff === true && <div>
              <Menu >
  <MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<HamburgerIcon />}
    variant='outline'
  />
  <MenuList>
    <MenuItem icon={<RepeatIcon />} command='⌘N'>
      החלף תמונת רקע
    </MenuItem>
    <MenuItem icon={<EditIcon />} command='⌘O'>
      שנה שם
    </MenuItem>
    <MenuItem icon={<DeleteIcon />} command='⌘O' onClick={()=>{handleRemoveAlbum(album.id, album.name)}}>
      מחק אלבום
    </MenuItem>
  </MenuList>
</Menu></div>}  */}
            
  <p>
    {album.name}
  </p>
            </div>
            
            
            <img src='https://mdbootstrap.com/img/new/standard/city/053.webp'
            onClick={()=>{handleAlbumClick(album.id)}}
            className='album-image' alt='photographer-image' />
              </div>
              
              ))}
              

            
              {userDetails && userDetails.id==id &&
            <div className='album-container hover-zoom add-album-container' onClick={onOpen}> 
            <div style={{backgroundColor:"rgba(173, 246, 120, 0.75)"}}>
            הוספת אלבום
            </div>
            <img src="https://cdn.pixabay.com/photo/2013/07/12/17/55/plus-152614_640.png" alt="add album" className='album-image' />
            </div>}
            
            </div>
        </div>
        </div>

  )
}

export default PhotographerProfile