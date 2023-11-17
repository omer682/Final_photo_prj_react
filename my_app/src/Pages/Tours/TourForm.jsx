import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, FloatingLabel} from 'react-bootstrap';
import './tours.css'
import axios from 'axios';
import { apiUrls} from '../../config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appContext } from '../../App';
import Translate from '../../Translate';
const TourForm = () => {
  const today = new Date().toISOString().split('T')[0];
  const [cityOptions, setCityOptions] = useState()
  const nav = useNavigate()
  const {authToken, userDetails} = useContext(appContext)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [city, setCity] = useState('');
  const [mainImage, setMainImage] = useState(null)
  const [images, setImages] = useState(null)
  const [selectedDate, setSelectedDate] = useState('');
  const [hour, setHour] = useState('');
  const [requiredEquipment, setRequiredEquipment] = useState('');
  const [photographyGuide, setPhotographyGuide] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [price, setPrice] = useState(0);
  const [formErrors, setFormErrors] = useState('')
  
  useEffect(() => {
    if (!authToken){
      nav('/home')
    }
    axios.get(apiUrls.locations).then((resJ) => {
      if (resJ.status === 200){
                
        setCityOptions(resJ.data.locations)
        console.log(resJ)
        console.log(cityOptions)

      }
    }).catch((error)=>{
      // setError()
      console.log(error)
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors("")
    const jsonData = {
      "title" : title,
      "content" : content,
      "location" : city,
      "date" : selectedDate,
      "hour" : hour,
      "phone_number" : phoneNumber,
      "guide_name" : photographyGuide,
      "price" : price,
      "equipment_needed" : requiredEquipment,
      "tour_status" : "pending",
} 

    const formData = new FormData();
    formData.append("main_image", mainImage)
    if(images){
    formData.append("tour_images", images[0])
    }
    Object.entries(jsonData).map(([key, value])=>(formData.append(key, value)))
    
    try{
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    const resJ = await axios.post(apiUrls.handleTour, formData);
    if (resJ.status === 200){
    {userDetails.is_staff === false ? toast.warning('הטופס התקבל וממתין לאישור') : toast.success('הסיור התווסף בהצלחה')}
      nav('/home')
      
      
    }
    }
    catch(error){
      if(!error?.response){
        toast.error('תקלה זמנית השירות לא זמין כעת')
        nav('/home')
        console.log(error)
      }
      else if(error?.response?.data?.error){
      console.log(error)
      setFormErrors(error.response.data.error)
      }
    }
    
  };

  return (
  
      <Container className="py-5 d-flex flex-row">
        <Form onSubmit={handleSubmit}  className='d-flex flex-row justify-content-between w-100' encType='multipart/form-data'>
          <div>
          {(typeof formErrors === 'string' && formErrors) && (<p style={{ color: "red", marginBottom:"10vh", backgroundColor:"lightpink", display:"inline-block", padding:"1vh"}}>{formErrors}</p>)}

            <FloatingLabel controlId="tourName" label="כותרת " className="mb-4">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              minLength={10}
              
              required
            />
          <span className='inputs-description' style={{margin:"0 0 0 20vh"}}> על הכותרת להכיל 10 עד 80 תווים </span>
          {title.length > 10  && <span  className='inputs-description' style={{color:"mediumpurple"}}> אורך - {title.length} תווים</span>}
          {formErrors?.title && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.title}/>}</p>}
          </FloatingLabel>

          <FloatingLabel controlId="content" label="תוכן" className="mb-4">

            <Form.Control
              as="textarea"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ minHeight: '20vh' }}
              minLength={200}
              maxLength={2000}
              required
            />
           <span className='inputs-description' style={{margin:"0 0 0 20vh"}}> תוכן הסיור חייב להכיל לפחות 200 תווים</span>
          {content.length > 10  && <span  className='inputs-description' style={{color:"mediumpurple"}}> אורך - {content.length} תווים</span>}
          {formErrors?.content && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.content}/>}</p>}
          </FloatingLabel>

          {/* {cityOptions &&  <Dropdown className="mb-4" >
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" style={{width:"20vh", overflow:"hidden"}}>
       {city ? <>{city}</> : <>בחר עיר</>}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: '20vh', overflowY: 'auto' }}>
        {cityOptions.map((item) => (
          <Dropdown.Item key={item.id} 
          onClick={() => setCity(item.city)}
          >{item.city}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
      <div className='inputs-description'> בחר עיר יישוב של המפגש / בקרבת מקום</div>
      {formErrors?.location && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.location}/>}</p>}
    </Dropdown>} */}

    {cityOptions &&  <div className='mb-4' >
      <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
    <option>-- בחר עיר --</option>
    {cityOptions.map((item) => (
          <option key={item.id} 
          >{item.city}</option>
        ))}
        </Form.Select>
    <div className='inputs-description'> בחר עיר יישוב של המפגש / בקרבת מקום</div>
      {formErrors?.location && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.location}/>}</p>}
    </div>} 
    
          

          <FloatingLabel controlId="date" label="תאריך" className="mb-4">
            <Form.Control
              type="date"
              min={today}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          {formErrors?.date && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.date}/>}</p>}

          </FloatingLabel>
        
          <FloatingLabel controlId="time" label="שעה" className="mb-4">
            <Form.Control
              type="time"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />  
          {formErrors?.hour && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.hour}/>}</p>}

          </FloatingLabel>

          <FloatingLabel controlId="requiredEquipment" label="ציוד נדרש" className="mb-4">
            <Form.Control
              type="text"
              value={requiredEquipment}
              onChange={(e) => setRequiredEquipment(e.target.value)}
              maxLength={50}
              required
            />
            {formErrors?.equipment_needed && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.equipment_needed}/>}</p>}

          </FloatingLabel>

          
          <FloatingLabel controlId="photographyGuide" label="מדריך הצילום" className="mb-4">
            <Form.Control
              type="text"
              value={photographyGuide}
              onChange={(e) => setPhotographyGuide(e.target.value)}
              maxLength={50}
              required
            />
            {formErrors?.guide_name && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.guide_name}/>}</p>}

          </FloatingLabel>

          <FloatingLabel controlId="phoneNumber" label="מספר טלפון" className="mb-4">
            <Form.Control
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={50}
              required
            />
          {formErrors?.phone_number && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.phone_number}/>}</p>}

          </FloatingLabel>
          <FloatingLabel controlId="price" label="מחיר" className="mb-4">
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              
            />
            {formErrors?.price && <p style={{color: "red"}}>{<Translate errorMessage={formErrors.price}/>}</p>}
          </FloatingLabel>


      <Button variant="primary" type="submit">
            שלח 
          </Button>     
      </div>
        <div>
        <FloatingLabel label="תמונה ראשית" className="mb-4">
            <Form.Control
              type="file"      
              onChange={(e)=>{setMainImage(e.target.files[0])}}
              required
            />
            <div className='inputs-description'>בחר תמונה ראשית שתופיע בראש העמוד</div>
          </FloatingLabel>
        <FloatingLabel  label="תמונות נוספות" className="mb-4">
            <Form.Control
              type="file"
              onChange={(e)=>{setImages(e.target.files)}}
              multiple
              
              
            />
             <div className='inputs-description'>תוכל לבחור תמונות נוספות שיוצגו בסוף העמוד</div>
             <div className='inputs-description' style={{color:"black"}}>*שדה לא חובה</div>
             {formErrors?.image && <p style={{color: "red", maxWidth:"40vh"}}>{<Translate errorMessage={formErrors.image}/>}</p>}
             
          </FloatingLabel>


        </div>

            

        </Form>
      </Container>
  );
};

export default TourForm;
