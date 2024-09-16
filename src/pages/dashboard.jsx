import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Select,
  useBreakpointValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import Folder from '../components/Folder'
import Project from '../components/Project'

import GridIcon from '../svg/grid.svg'
import ListIcon from '../svg/list.svg'


export default function DashboardPage() {
  const folders = useSelector((state) => state.data.folders);
  const projects = useSelector((state) => state.data.projects);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [selectedFolderId, setSelectedFolderId] = useState(0);
  const [sortFolders, setSortFolders] = useState([]);

  useEffect(() => {
    console.log(projects, folders)
    setSortFolders(folders?.map((folder) => {
      return {
        ...folder,
        'projects': projects.filter((project) => project.folderId == folder.id)
      }
    }));
  }, [projects, folders]);

  return (
    <Box>
      <Box
        p={4}
      >
        <Flex
          as="nav"
          color="white"
          align="center"
          paddingBottom={2}
          justify="space-between"
          borderBottom='1px'
          borderBottomColor='#ddd'
        >
          {/* Left Side */}
          <Box>
            <Text fontSize="lg" color='black' fontWeight="bold">My Projects</Text>
          </Box>

          {/* Right Side */}
          <Flex gap={isDesktop ? 4 : 2}>
            <Select borderRadius={0} mr={isDesktop ? 4 : 0} color='black' border='none'>
              <option value='option1'>Last Modified</option>
              <option value='option2'>Folder 2</option>
              <option value='option3'>Folder 3</option>
            </Select>
            <Image cursor='pointer' src={GridIcon} />
            <Image cursor='pointer' src={ListIcon} />
          </Flex>
        </Flex>
      </Box>
      <Box p={4}>
        <SimpleGrid columns={[1, null, 2, null, 4]} spacing={5}>
          {sortFolders?.map((folder, index) => (
            <Box
              key={index}
              onClick={() => setSelectedFolderId(folder.id)}
              boxShadow={folder.id === selectedFolderId ? 'md': 'none'}
              border={folder.id === selectedFolderId ? '1px': 'none'}
              borderColor={folder.id === selectedFolderId ? 'gray.300': 'none'}
              _hover={{
                bgColor: 'gray.100',  // Background color on hover
                boxShadow: 'lg',      // Box shadow on hover
                cursor: 'pointer',    // Change cursor to pointer on hover
              }}
            >
              <Folder folderDetail={folder} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box p={4}>
        <SimpleGrid columns={[1, null, 2, null, 4]} spacing={5}>
          {projects?.filter((project) => project.folderId == selectedFolderId).map((project, index) => (
            <Link to={`/project/${project.id}`} key={index}>
              <Project projectDetail={project} />
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
