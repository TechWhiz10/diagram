import { border, extendTheme, FormControl, FormLabel, layout, Modal, ModalBody, ModalContent, ModalFooter } from '@chakra-ui/react';

// Define custom blue colors
const theme = extendTheme({
  colors: {
    blue: {
      50: '#ebf8ff',    // Lightest
      100: '#ceedff',
      200: '#b3daff',
      300: '#7b9cf3',
      400: '#4b6fe1',
      500: '#2a4fa1',   // Base
      550: '#0065FD',
      600: '#1e3d7e',
      700: '#1a2c5d',
      800: '#14204e',
      900: '#0e1640',   // Darkest
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'blue.300' : 'blue.400', // Subtle blue
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'blue.500' : 'blue.600',
          },
        }),
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'blue.300' : 'blue.400',
          color: props.colorMode === 'dark' ? 'blue.300' : 'blue.400',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.600' : 'blue.100',
          },
        }),
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'gray.600',
      }
    },
    Modal: {
      parts: ['dialog', 'header', 'body', 'footer'],
      baseStyle: {
        dialog: {
          borderRadius: 3, // Remove border radius
          bg: '#F9F9F9',
          'input, select': {
            bg: 'white',
            border: 'none',
          },
          '.chakra-modal__header': {
            bg: '#0065FD'
          },
        },
        header: {
          borderTopRadius: 3, // Border radius for ModalHeader
          fontWeight: 'normal', // Set normal font weight for ModalHeader
        }
      },
    },
    Card: {
      baseStyle: {
        boxShadow: 'none'
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: '#F9F9F9', // Lightest blue
      },
    },
  },
});

export default theme;
