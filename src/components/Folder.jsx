import React from 'react'
import { 
  Text, 
  Flex, 
  Heading
} from '@chakra-ui/react'

export default function Folder({ folderDetail }) {
  return (
    <div style={{padding: '24px'}}>
        <Heading size='xs' textTransform='uppercase'>
          {folderDetail.title}
        </Heading>
        <Flex
          justify="space-between"
          align='center'
        >
          <Text pt='2' fontSize='sm'>
            {folderDetail.projects.length} files
          </Text>
          <Text pt='2' fontSize='sm'>
            Edited {folderDetail.updatedAt}
          </Text>
        </Flex>
    </div>
  )
}
