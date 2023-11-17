import React, { useContext, useEffect, useState } from 'react'
import './tours.css'
import { Form, Container, Button,Card} from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import { apiUrls, replacementImages } from '../../config'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faLocationDot, faMoneyBill1Wave, faShekelSign} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {useColorMode } from '@chakra-ui/react'
import { appContext } from '../../App'

const Tours = () => {
  const {authToken} = useContext(appContext)
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [location, setLocation] = useState('')
  const [otherSearch, setOtherSearch] = useState('')
  const [toursData, setToursData] = useState()
  const [errors, setErrors] = useState('')
  const {colorMode} = useColorMode();   

  useEffect(()=>{
    
    axios.get(apiUrls.tours, {params: {page : page, location : location, otherSearch : otherSearch}}).then((resJ)=>{
      if(resJ.status === 200){
        console.log(resJ)  
        setToursData(resJ.data.data)
      
      
    }
    }).catch(error=>{
      //  still need to be handled
      console.log(error)
    })
  }, [page, location])
  
  useEffect(()=>{
    axios.get(apiUrls.locations)
      .then(resJ => {
        if (resJ.status === 200){
          console.log(resJ)
          const locationsByRegion = [
            {"label" : "מרכז", "options" : [{"label": "אזור המרכז", "value": "מרכז"}]},
            {"label" : "צפון", "options" : [{"label": "אזור הצפון", "value": "צפון"}]},
            {"label" : "ירושלים", "options" : [{"label": " אזור ירושלים", "value": "אזור ירושלים"}]},
            {"label" : "דרום", "options" : [{"label": "אזור הדרום", "value": "דרום"}]},
          ]
          console.log(resJ)
          resJ.data.locations.forEach((item) => {
            const matchingRegion = locationsByRegion.find((region) => region.label === item.region);
            
            if (matchingRegion) {
              matchingRegion.options.push({
                value: item.city,
                label: item.city,
              });}});     
          console.log()
          setLocations(locationsByRegion)
        }})
      .catch(error => {
        console.error(error);
      });}, [])

      const handleCitySelect = (event) =>{
        setPage(1)
        setLocation(event.value)
      }

      const handleForm = (event) =>{
        event.preventDefault()
        console.log(location)
      }
      const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          '&:hover': {
            backgroundColor: 'lightgray',
          },
        }),
        groupHeading: (provided) => ({
          ...provided,
          fontSize: '26px',
          color:"steelblue",
          textAlign: "center",
          cursor: 'pointer'
        }),
      }



  return (<>
    <div className='tours-div-container'>
      <div className='tours-cover-img'>
  <p style={{fontWeight:"900", fontSize:"5vh"}}>סיורי צילום ברחבי הארץ</p>
</div>
      
    </div>

    
    <Container>
    
      <Form onSubmit={handleForm} className='d-flex flex-row' style={{maxHeight:"15vh"}}>
    
    <Select className='tours-form'placeholder="בחר אזור" options={locations} styles={customStyles} onChange={(event)=>{handleCitySelect(event)}}/>
    
    <Form.Select className='tours-form' style={{width:"350px"}}>
      <option>בארץ</option>
      <option>בעולם</option>
    </Form.Select> 
    
      <Button type='submit' className='tours-form' style={{width:"100px", marginRight:"auto"}} variant='dark' > חפש </Button> 

    
    {authToken && <Button variant='outline-dark' as={Link} to="/tours/add-tour-form"  className='tours-form' style={{width:"15vh"}}>טופס סיורים</Button>}  
    </Form>   
    
    

    <div>
    {toursData && toursData?.results && toursData.results.map((tour)=>(<div key={tour.id}>
      <Card className='tour-card shadow-box' style={{background : 'linear-gradient(to bottom, #2C3E50, #34495E)'}}>
      <div className="row no-gutters">
        <div className="col-md-8">
          <Card.Body>
            <Card.Header style={{overflow:"hidden", maxHeight:"50px", fontSize:"2rem", fontWeight:"600", color:"bisque",
             backgroundColor:"#2C3E50"}}>{tour.title}</Card.Header>
            <Card.Text style={{overflow:"auto", maxHeight:"170px", minHeight:"170px", fontSize:"1.15rem", whiteSpace:"pre-wrap", color:"darkkhaki"}}>{tour.content}</Card.Text>
            <Card.Text style={{padding:"10px"}}> <FontAwesomeIcon icon={faCalendarWeek} bounce size="xl" style={{color: "#e49c21", padding:"0px 0px 0px 20px"}}/> <span style={{fontWeight:700}}> {tour.date} {tour.hour}</span></Card.Text>
            <Card.Text style={{padding:"10px"}}> <FontAwesomeIcon icon={faLocationDot} size='xl' style={{color: "#e08506", padding:"0px 0px 0px 20px"}} /> <span style={{fontWeight:700}}>{tour.location_name}</span> </Card.Text>
            
            <Card.Text style={{padding:"10px"}}><FontAwesomeIcon icon={faMoneyBill1Wave} size='xl' style={{color: "#146312", padding:"0px 0px 0px 20px"}} /> <span style={{fontWeight:700}}>{tour.price}<FontAwesomeIcon size='xs' icon={faShekelSign} /></span> </Card.Text>
            <Card.Text dir='ltr'><Button variant='outline-warning' style={{borderRadius:"1.5rem"}} as={Link} to={`/tours/tour/${tour.id}`}> לפרטים והרשמה</Button> </Card.Text>
            
          </Card.Body>
          
        </div>
        <div className="col-md-4 ">
          <Card.Img src={tour?.main_image ? tour.main_image : replacementImages['camera\'s']} style={{width:"450px", height:"450px"}}  />
        </div>

      </div>

    </Card>
    </div>))}

    </div>

    <div style={{justifyContent:"center", display:"flex"}}>
    <PaginationControl
    page={page}
    between={1}
    last={true}
    total={toursData?.count}
    limit={10}
    
    changePage={(page) => {
      setPage(page)
    }}
    ellipsis={2}
  />
    </div>

    </Container>
    </>
  )
}

export default Tours