import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button
} from '@chakra-ui/react'
import React from "react";


const Home = () => {

  const options = {
    year: 'numeric',
    month: 'long',};
  // const hebrewFormatter = new Intl.DateTimeFormat('he-IL', options);
  const inputDate = new Date("2023-10-14T10:28:06.755958+03:00");

 
  return (
    <div id="Home" >
    <Popover>
  <PopoverTrigger>
    <div>hello guys</div>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton style={{marginLeft:"auto"}}/>
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>
      

    </div>
  );
};

export default Home;
