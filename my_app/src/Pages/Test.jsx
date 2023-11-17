
import { Button  as ChakraButton} from '@chakra-ui/react'
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap';
const Test = () => {
  return (
    <div style={{border:"black solid 2px" }}  >
      abcdefg
    <ChakraButton colorScheme='twitter'> im Chakra Button </ChakraButton>
    <BootstrapButton style={{height:"4rem"}}><b style={{fontSize:"0.8rem"}}>התחברות</b> <br /><b style={{fontSize:"0.6rem"}}>אין לך משתמש? הרשם עכשיו</b></BootstrapButton>
    
    </div>
  )
}

export default Test