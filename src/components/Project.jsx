import React, { useState } from 'react'
import {
  Button,
  Text,
  Image,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Img,
} from '@chakra-ui/react'

export default function Project({ projectDetail }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div>
      <Box
      position="relative"
      width="full"
      height="300px"  // Adjust height as needed
      backgroundImage="url('/img/project.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          variant="ghost"
          colorScheme="black"
          color="blue.500"
          position="absolute"
          top={2}
          right={2}
        >
          <Img src='./img/drop-down.png' alt='drop down list' width={5} height={5} />
        </MenuButton>

        <MenuList
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          position="absolute"
          top={-2}
          right={-10}
          minWidth="120px"
          backgroundColor="white"
          borderColor="gray.300"
          borderWidth="1px"
          boxShadow="md"
        >
          <MenuItem color="black">Move</MenuItem>
          <MenuItem color="black">Delete</MenuItem>
          <MenuItem color="black">Share</MenuItem>
        </MenuList>
      </Menu>
    </Box>
      <div>
        <Heading size='xs' textTransform='uppercase'>
          {projectDetail.title}
        </Heading>
        <Text pt='2' fontSize='sm'>
          Edited {projectDetail.updatedAt}
        </Text>
      </div>
      </div>
  )
}
