import { Avatar, Box, keyframes, useColorMode} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { appContext } from '../App';
import { avatars } from '../config';


const CustomPhoto = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const {userDetails} = useContext(appContext)
  const pulseRing = keyframes`0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
  return (
    
    <Box as='span' _before={{
      content: "''",
      animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
      bgColor : '#4d6aad',
      boxSizing: 'border-box',
      borderRadius: '50%',
        }}>

        <Avatar
        src={userDetails?.image ? userDetails.image :
        (userDetails?.gender === "female" ? avatars.femaleAvatar1 :
         avatars.maleAvatar1)}
        width="40px"
        height="40px"
    
        bg={colorMode === 'dark' ? "#4d6aad" : "teal.500"} 
        />
        
        </Box>
  )
}

export default CustomPhoto