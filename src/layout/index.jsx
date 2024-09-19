import React from 'react';
import { 
  Box, 
  Flex, 
  Image,
  useBreakpointValue
} from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

import LeftSvg from '../svg/login-left.svg';
import RightSvg from '../svg/login-right.svg';

import Header from './Header';
import Container from './Container';

export default function PageLayout() {
  const location = useLocation();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const Left = () => (
    <Box
      position='fixed'
      zIndex={-1}
      top='70%'
      left={0}
    >
      <Image src={LeftSvg} />
    </Box>
  )
  const Right = () => (
    <Box
      position='fixed'
      top='20%'
      zIndex={-1}
      right={0}
    >
      <Image src={RightSvg} />
    </Box>
  )
  const Bottom = () => (
    <Box
      position="fixed"
      top={isDesktop ? "25%" : "15%"}
      right="0"
      width="full"
      height="100%"
      backgroundImage="url('/img/background.png')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      zIndex="-2" // To ensure it's behind the content
    />
  )

  const renderBackgroundImage = () => {
    switch (location.pathname) {
      case '/forgot-password':
      case '/reset-password':
      case '/login':
      case '/register':
        return (
          <>
            <Left />
            <Right />
            <Bottom />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Box>
      <Header />
      <Flex direction="column" minHeight="calc(100vh - 60vh)">
        <Box as="main" flex="1">
          <Container />
        </Box>
      </Flex>
      {renderBackgroundImage()}
    </Box>
  );
}
