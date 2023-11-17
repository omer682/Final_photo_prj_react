import React, { useContext, useEffect, useRef, useState } from 'react'
import './photographers.css'
import {Button, Container, Form} from 'react-bootstrap'
import { appContext } from '../../App';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardTitle,MDBInput} from 'mdb-react-ui-kit'
import { apiUrls, avatars } from '../../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../Components/pagination/Pagination';
import { Link } from 'react-router-dom';
const Photographers = () => {
  const {userDetails} = useContext(appContext)
  const [users, setUsers] = useState()
  const [searchByName, setSearchByName] = useState("")
  const [orderBy, setOrderBy] = useState("")
  // const colorIndex = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0]
  const [triggerEffect, setTriggerEffect] = useState(true)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState()
 



 useEffect(()=>{
  
  
  const params = {params: {
    page:page,
    ...(searchByName && { search_by_name: searchByName }),
    ...(orderBy && { order_by: orderBy })
  }}
  axios.get(apiUrls.getPhotographers, params).then((resJ)=>{
    if (resJ.status===200){
      setUsers(resJ.data.users.results)
      setCount(resJ.data.users.count)
    }
  }).catch(error=>{
    console.log(error, "erorr!!!!")
  })
 }, [page, triggerEffect])

 const handleSearch= (e) =>{
  e.preventDefault()
  setTriggerEffect(!triggerEffect)
  setPage(1)
 }

  return (
    <div>
        <div className='photographers-div-container'>
      <div className='photographers-cover-img'>
  <p style={{fontWeight:"900", fontSize:"5vh"}}>צלמים ואלבומים</p>
</div>
      

    </div>
      <div className='d-flex flex-row'>
          <Form className='container side-bar' onSubmit={handleSearch} >
            
            
          
          <MDBInput style={{marginTop:"5vh", backgroundColor:"white"}} label="חיפוש לפי שם" value={searchByName} onChange={(e)=>{setSearchByName(e.target.value)}}/>   
                
          
          <MDBBtn type='submit' className='m-5'>חפש</MDBBtn> 
                    </Form>

    <Container style={{maxWidth:"150vh"}} > 
    

    {users &&
    <div className='d-flex flex-row flex-wrap justify-content-center'> 
    {users.map((user, index)=>(<MDBCard className='m-5 user-card' key={user.id} >
    {/* style={{  backgroundColor: colors[colorIndex[index]]}} */}
      <MDBCardGroup className=''>
      <MDBCardTitle className='d-flex align-items-center justify-content-center' style={{fontSize:"3vh", minWidth:"33vh", maxWidth:"33vh", maxHeight:"7vh", minHeight:"7vh" , overflow:"hidden"}}>
      {user.first_name} {user.last_name}
         </MDBCardTitle>

         <MDBCardImage  src={user?.image ? user.image :
        (user.gender === "female" ? avatars.femaleAvatar1 :
         avatars.maleAvatar1)} className="rounded-3" position='top' alt='...' style={{width:"8.5vh", marginRight:"auto", height:"8.5vh"}} />

      </MDBCardGroup>
      <hr/>
      <MDBCardGroup className='m-4 d-flex flex-row justify-content-between' style={{overflowX:"auto"}}>
        
      <div className='mx-4' style={{fontSize:"1.5vh"}}>       
         <b className="m-2">תאריך הצטרפות :</b>
         <> {new Date(user.date_joined).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' })}</>
        
        
        <hr  className="mb-2"/>
        <b className="m-2">תמונות : </b><>{user.image_count}</>
        <hr className="mb-2 w-50"/>
        {user?.city && <><FontAwesomeIcon icon={faLocationDot} className='mt-2 mx-1'/>
        <b className='mx-1'>{user.city}</b></>}
        </div>

          <div style={{fontSize:"2vh"}}>
        <div >  דירוג האתר  </div>
        <hr className="mb-2 w-75"/> 
        {user?.rating?.average ? <span className="m-2" style={{backgroundColor:"rgb(20, 100, 100, 0.2)", padding:"0.8vh", borderRadius:"2rem"}}>{user.rating.average.toFixed(1)}
         <FontAwesomeIcon icon={faStar} style={{color: "#f2dd78",}} /></span> : <></>}
         <div style={{fontSize:"0.8rem"}} className='m-2'> <b>{user.rating.count}</b> <span style={{opacity:"0.7"}}>גולשים דרגו </span> </div>
        </div>
        </MDBCardGroup>
      <MDBCardGroup >
      <MDBCardBody className='d-flex justify-content-center'>     
      <Link to={`/photographers/profile/${user.id}`}>
        <MDBBtn outline color='dark'>כניסה לעמוד</MDBBtn>
      </Link> 
      </MDBCardBody>
      </MDBCardGroup>
    </MDBCard>))}</div>}
    
      

    </Container>
    <Form className='m-4' style={{width:"15%"}} onChange={handleSearch}>
    <Form.Group >
        <Form.Label className='m-2' style={{color:"red"}}>מיין לפי : </Form.Label>
    <Form.Select className='' size='sm' value={orderBy} onChange={(e)=>{setOrderBy(e.target.value)}}>
  
          <option value="date_joined"> תאריך הצטרפות </option>
          <option value="image_count">מספר תמונות</option>
          <option value="rating">דירוג באתר</option>
          

            </Form.Select>
            </Form.Group>


          
            </Form>
    </div>
    <Pagination page={page} setPage={setPage} last={Math.ceil(count/12)}/>
      
    
    </div>
  )
}

export default Photographers