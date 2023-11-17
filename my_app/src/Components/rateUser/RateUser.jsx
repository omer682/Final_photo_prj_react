import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useContext, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { appContext } from '../../App';
import axios from 'axios';
import { apiUrls } from '../../config';
import { toast } from 'react-toastify';
import { position } from '@chakra-ui/react';

const RateUser = ({ratedUser, setUserRating}) => {
  const {userDetails, authToken} = useContext(appContext)
  const [stars, setStars] = useState(0);

  const handleRating = async () => {
        
        let rate = stars * 2
        if (stars===0){
          rate = 1
        }
        const ratingData = {
      rated_user : ratedUser,
      rate : rate
    }
    try{
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      const resJ = await axios.post(apiUrls.rating, ratingData)
      if (resJ.status===200){
        setUserRating(true)
        toast.success('דירוג נשלח בהצלחה',{position : "top-center"})
    }
      
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div dir='ltr' style={{display:"inline-block"}}>
      <ReactStars
        count={5}
        value={stars}
        onChange={(newRating) => setStars(newRating)}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      
    <MDBBtn outline style={{color:"gold"}} color='warning' onClick={handleRating} >שלח דירוג</MDBBtn>
    </div>
  );
};

export default RateUser;
