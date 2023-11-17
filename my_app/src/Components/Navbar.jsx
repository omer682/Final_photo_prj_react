import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  useDisclosure,
  IconButton,
  Menu,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  MenuButton,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import CustomPhoto from "./CustomPhoto";
import { useContext } from "react";
import { appContext } from "../App";
import { navPaths } from "../config";
import LoginAndRegisterModal from "./loginAndRegister/LoginAndRegisterModal";
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usedisclosure2 = useDisclosure();
  const {authToken, setAuthToken, userDetails, setUserDetails} = useContext(appContext)

  const path = useLocation().pathname;

  const handleLoginClick = () =>{
    usedisclosure2.onOpen()}

  const handleLogout = () =>{
    setUserDetails(null)
    setAuthToken(null)
    localStorage.removeItem('auth-token')
  }

  return (
    <>
      {!authToken && usedisclosure2.isOpen && <LoginAndRegisterModal isOpen={usedisclosure2.isOpen} onClose={usedisclosure2.onClose}/>}
      <div className="sticky-top" dir="ltr" style={{fontFamily:"David Libre"}}>
        <Box
          bg={useColorModeValue("gray.600", "gray.900")}
          px={5}
          width={["100%"]}
        >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack w="14%">
              {!authToken ? (
                <Button  onClick={handleLoginClick}>
                  התחברות
                </Button>
              ) : (
                <Menu>
                  <MenuButton style={{ display: "inline-block" }}>
                    <CustomPhoto colorMode={colorMode} />
                  </MenuButton>

                  <MenuList>
                    <MenuGroup title={`${userDetails && userDetails.email}`}>
                      <MenuItem as={Link} to="/user-edit">עריכת פרטים</MenuItem>
                      {userDetails && <MenuItem as={Link} to={`/photographers/profile/${userDetails.id}`}>עמוד אישי</MenuItem>}
                      <MenuItem onClick={handleLogout}>התנתקות </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="עוד אפשרויות">
                      <MenuItem>טפסים</MenuItem>
                      <MenuItem>צור קשר</MenuItem>
            
                    </MenuGroup>
                  </MenuList>
                </Menu>
              )}
            </HStack>

            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <HStack spacing={8} alignItems={"center"}>
                <HStack
                  as={"nav"}
                  spacing={16}
                  display={{ base: "none", md: "flex" }}
                  id="myDIV"
                >
                  <Button
                    className={
                      `btnDeco ${path === navPaths[1] ? "active" : ""}`}
                    as={Link}
                    to={navPaths[1]}
                    color="gray.200"
                    variant="link"
                    fontSize="1.5rem"
                    _hover={{}}
                  >
                    <b>בלוג</b>
                  </Button>

                  <Button
                    className={
                      `btnDeco ${path === navPaths[2] ? "active" : ""}`}
                    as={Link}
                    to={navPaths[2]}
                    variant="link"
                    color="gray.200"
                    fontSize="1.5rem"
                    _hover={{}}
                    
                  >
                    <b>צלמים</b>
                  </Button>

                  <Button
                    className={
                      `btnDeco ${path === navPaths[3] ? "active" : ""}`}
                    as={Link}
                    to={navPaths[3]}
                    color="gray.200"
                    variant="link"
                    fontSize="1.5rem"
                    _hover={{}}
                    
                  >
                    <b>סיורים</b>
                  </Button>
                  {/* <Button
                    className={
                      `btnDeco ${path === navPaths[5] ? "active" : ""}`}
                    as={Link}
                    to={navPaths[5]}
                    color="gray.200"
                    variant="link"
                    fontSize="1.5rem"
                    _hover={{}}
                    
                  >
                    <b> מה חדש</b>
                  </Button> */}

                  <Button
                    className={
                      `btnDeco ${path === navPaths[0] ? "active" : ""}`}
                    as={Link}
                    to={navPaths[0]}
                    fontSize="1.5rem"
                    variant="link"
                    color="gray.200"
                    _hover={{}}
                   
                  >
                    <b>דף הבית</b>
                  </Button>
                </HStack>
              </HStack>
            </Flex>

            {/* <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex> */}

            <div >
              <img src="https://photo-project-storage.s3.eu-central-1.amazonaws.com/front-usage/favicon.ico.png" alt="" />
            </div>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            {isOpen ? (
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4} padding="15rem 0vh 0vh 0vh">
                  <Button
                  as={Link}
                  to={'/home'}
                    colorScheme={colorMode === "light" ? "cyan" : "gray"}
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#a2e4ff 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                  >
                    
                      <b>Home</b>
                    
                  </Button>

                  <Button
                  as={Link}
                  to={"/photographers"}
                    colorScheme={colorMode === "light" ? "twitter" : "gray"}
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#a2e4ff 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                  >
                    <b>Photographers</b>
                  </Button>

                  <Button
                  as={Link}
                  to={"/tours"}
                    colorScheme={colorMode === "light" ? "blue" : "gray"}
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#a2e4ff 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                  >
                    
                      <b>Tours</b>
                  </Button>

                  {/* <Button
                    colorScheme={colorMode === "light" ? "facebook" : "gray"}
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#a2e4ff 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                  >
                    <a href="#Projects">
                      <b>Projects</b>
                    </a>
                  </Button> */}

                  {/* <Button
                    colorScheme={colorMode === "light" ? "teal" : "gray"}
                    onClick={isOpen ? onClose : onOpen}
                    _hover={{
                      textShadow: "#a2e4ff 1px 0 10px",
                      transform: "scale(1.2)",
                    }}
                  >
                    <a href="#Contact">
                      <b>Contact</b>
                    </a>
                  </Button> */}
                </Stack>
              </Box>
            ) : null}
          </Flex>
        </Box>
      </div>
      <br/>
    </>
  );
}
