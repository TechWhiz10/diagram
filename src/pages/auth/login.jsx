import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle form submission
    toast({
      title: 'Login Successful',
      description: 'You have successfully logged in.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
    login({
      token: Math.random()
    });
    // Redirect to dashboard or another page
    navigate('/');
  };

  return (
    <Container maxW="lg">
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading fontSize='2xl' mb={6}>Sign in to your Account</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" placeholder="Email" {...register('email')} />
              {errors.email && <Box color="red.500">{errors.email.message}</Box>}
              <Text fontSize='md' mt={2} color='red'>
                There is no account with this email.{' '}
                <Link color="blue.400" onClick={() => navigate('/register')}>
                  Sign up
                </Link>
              </Text>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password')}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <Box color="red.500">{errors.password.message}</Box>}
            </FormControl>

            <FormControl>
              <Checkbox id="rememberMe">Remember me</Checkbox>
            </FormControl>

            <Button borderRadius='full' bgColor='blue.550' type="submit">Sign in</Button>

            <Text fontSize='md' textAlign='center'>
              <Link color="gray.600" onClick={() => navigate('/forgot-password')}>
                Forgot Password
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
