import React from 'react'
import {
  Text,
  Image,
  Heading,
} from '@chakra-ui/react'

export default function Project({ projectDetail }) {
  return (
    <div>
      <div>
        <Image
          objectFit='cover'
          src='/img/project.png'
          alt='Project Preview'
        />
      </div>
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
