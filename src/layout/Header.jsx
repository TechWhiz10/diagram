import React, { useState } from 'react'
import {
  Flex,
  Stack,
  Button,
  useBreakpointValue,
  useDisclosure,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Select
} from '@chakra-ui/react'


import { useLocation, useNavigate } from 'react-router-dom'

import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react' 

import ProjectModal from '../components/Modals/ProjectModal'
import FolderModal from '../components/Modals/FolderModal'

import PageLogo from '../svg/logo.svg'

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isFolderModalOpen, onOpen: onFolderModalOpen, onClose: onFolderModalClose } = useDisclosure();
  const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure();


  const renderButtons = () => {
    switch (location.pathname) {
      case '/forgot-password':
      case '/reset-password':
      case '/login':
        return (
          <Button
            colorScheme='blue'
            variant='outline'
            onClick={() => navigate('/register')}
            borderRadius={100}
          >
            Sign up
          </Button>
        );
      case '/register':
        return (
          <Button
            colorScheme='blue'
            variant='outline'
            onClick={() => navigate('/login')}
            borderRadius={100}
          >
            Sign in
          </Button>
        );
      case '/':
      case '/dashboard':
        return isDesktop ? (
          <Stack direction="row" spacing={4}>
            <Button
              borderRadius={100}
              colorScheme='blue'
              onClick={onFolderModalOpen}
              variant='outline'
            >
              New Folder
            </Button>
            <Button
              borderRadius={100}
              colorScheme='blue'
              onClick={onProjectModalOpen}
            >
              New Project
            </Button>
          </Stack>
        ) : (
          <>
            <Button colorScheme="blue" onClick={onDrawerOpen} borderRadius={0}>
              <HamburgerIcon />
            </Button>
            <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} placement="right">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <HamburgerIcon />
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing={4}>
                    <Button
                      borderRadius={100}
                      colorScheme='blue'
                      variant='outline'
                      onClick={onFolderModalOpen}
                    >
                      New Folder
                    </Button>
                    <Button
                      borderRadius={100}
                      colorScheme='blue'
                      onClick={onProjectModalOpen}
                    >
                      New Project
                    </Button>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        );
      case location.pathname.startsWith('/project/') ? location.pathname : '':
        return (
          <Flex>
            <Stack direction="row" spacing={isDesktop ? 4 : ''} ml={isDesktop ? 4 : ''}>
              {
                isDesktop && <Button bgColor='transparent' color='black' isDisabled>Autosaved</Button>
              }
              <Button colorScheme='blue' variant='outline' borderRadius='full' px={isDesktop ? 8 : 4}>Invite</Button>
            </Stack>
          </Flex>
        );
      default:
        return null;
    }
  };


  return (
    <Flex direction='column'>
      <Flex as="header" color="white" p={4} align="center" justify="space-between">
        <Flex size="md">
          <Image src={PageLogo} alt='WebSite Logo' />
          {
            location.pathname.startsWith('/project/') && <>
              <Button
                borderRadius={100}
                mx={5}
                width={isDesktop ? 120 : ''}
                colorScheme='blue'
                onClick={() => navigate('/')}
              >
                <ChevronLeftIcon />
                Projects
              </Button>
              {
                isDesktop && <Menu isOpen={isOpen}>
                <MenuButton
                  as={Button}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  variant="ghost"
                  colorScheme="black"
                  color="blue.500"
                >
                  Rewiring Stafford House
                </MenuButton>
                
                <MenuList onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <MenuItem color="blue.500">Move Project</MenuItem>
                  <MenuItem color="blue.500">Share</MenuItem>
                  <MenuItem color="blue.500">Rename</MenuItem>
                  <MenuItem color="blue.500">Delete</MenuItem>
                </MenuList>
              </Menu>
              }
            </>
          }
        </Flex>
        {renderButtons()}
      </Flex>
      {location.pathname.startsWith('/project/') && !isDesktop && <Flex px={4}>
        <Select color='black' bgColor={'white'} borderRadius={0} placeholder='Rewiring Stafford House'>
          <option value='option1'>Move Project</option>
          <option value='option2'>Share</option>
          <option value='option2'>Rename</option>
          <option value='option3'>Delete</option>
        </Select>
      </Flex>}
      <ProjectModal isOpen={isProjectModalOpen} onClose={onProjectModalClose} />
      <FolderModal isOpen={isFolderModalOpen} onClose={onFolderModalClose} />
    </Flex>
  )
}
