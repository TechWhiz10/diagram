import React from 'react'
import { Box } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" bg="teal.500" color="white" p={4} textAlign="center">
      &copy; 2024 My App. All rights reserved.
    </Box>
  )
}
