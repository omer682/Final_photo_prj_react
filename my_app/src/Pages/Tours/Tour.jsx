import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrls, replacementImages } from '../../config';
import {Card, Container, ListGroup, ListGroupItem} from 'react-bootstrap'
import { useColorMode } from '@chakra-ui/react';
import {faLocationDot, faPhone, faCamera, faMoneyBill1} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button as ChakraButton,
  } from '@chakra-ui/react'
import { appContext } from '../../App';
import { toast } from 'react-toastify';
const Tour = () => {
    const {userDetails, authToken} = useContext(appContext)
    const {colorMode} = useColorMode();
    const [tour, setTour] = useState();
    const {id} = useParams();
    const nav = useNavigate()
    useEffect(()=>{
        axios.get(apiUrls.tours, {params : {id : id}}).then((resJ)=>{
            
            if(resJ.status === 200){
                console.log(resJ)
                setTour(resJ.data.tour)

            }
        }).catch(error=>{
            console.log(error)
        })
    }, [id])

    const handleDeleteTour = async () => {
        console.log('inside')
    try{
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    const resJ = await axios.delete(apiUrls.handleTour, {data : {tour_id : tour.id}});
    if(resJ.status===200){
        toast.success('סיור נמחק בהצלחה')
        nav('/tours')
        
    }
}
    
    catch(error){
        console.log(error)
    }
}

  return (
    <>{tour ? <Container> 
        
        <Card  style={{border:"none", backgroundColor:"rgba(245, 245, 250)"}}>
            <div className='d-flex flex-row justify-content-between'>
            <Card.Text style={{opacity:"0.5"}}> מספר סידורי: {tour.id}</Card.Text>
           {userDetails && (userDetails.id == tour.user || userDetails.is_staff === true )&&
            <Card.Text className='m-1' as='div'>
            <Popover>
  <PopoverTrigger>
    <ChakraButton colorScheme='red'> מחק סיור </ChakraButton>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton  marginRight={"270px"}/>
    <PopoverHeader>האם אתה בטוח שברצונך למחוק?</PopoverHeader>
    <PopoverBody dir='ltr'>
        <ChakraButton className='mx-1' colorScheme='red' onClick={handleDeleteTour} >מחק</ChakraButton>
    </PopoverBody>
  </PopoverContent>
</Popover>
      
                </Card.Text>} 
            </div>
            <Card.Title className='text-center display-6'>{tour.title}</Card.Title>
            <Card.Body className='tour-body'>
            <Card.Text as='div'>
            <div style={{fontSize:"1.4rem", color: colorMode === 'dark' ? "rgb(250, 255, 255)" : "rgb(250, 111, 111) "}}>רקע על הפעילות</div>
            <br/>
            <div style={{color: colorMode === 'dark' ? "rgb(55, 99, 225, 0.8)" : 'rgb(100, 100, 100, 0.9)', width:"60vh"}}>{tour.content}</div>
            </Card.Text>
            <div> 
            <Card.Img src={tour?.main_image ? tour.main_image : replacementImages['camera\'s']} style={{width:"450px", height:"450px"}}/>
            <div>{tour?.image?.discription}</div>
            </div>
            </Card.Body>
            <ListGroup className='m-5 tour-text list-group-width' style={{fontSize:"1.2rem", fontFamily:"David Libre"}}>
                <ListGroupItem><FontAwesomeIcon icon={faLocationDot} />  <b className='m-2'> אזור הפעילות : </b>
                 <i >{tour.location_name}</i>
                 </ListGroupItem>
                 <ListGroupItem ><FontAwesomeIcon icon={faCamera} /> 
                 <b className='m-2'>ציוד נדרש :</b><i>{tour.equipment_needed}</i></ListGroupItem>
                 <ListGroupItem ><FontAwesomeIcon icon={faPhone} /> 
                 <b className='m-2'>טלפון לפרטים והרשמה :</b><i>{tour.phone_number}</i></ListGroupItem>
                 <ListGroupItem><FontAwesomeIcon icon={faMoneyBill1} /> 
                 <b className='m-2'>מחיר :</b><i>{tour.price}</i></ListGroupItem>
                 
 
                           
            </ListGroup>
                
                
           
            

        </Card>
        
    </Container> : <></>}</>
  )
}

export default Tour