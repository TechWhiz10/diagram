import React from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function Container() {
  
  return (
    <Box p={4}>
      <Outlet />
    </Box>
  )
}
