import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Heading,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle password reset request
    toast({
      title: 'Password Reset Requested',
      description: 'If an account with this email exists, you will receive a password reset link.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
    // Redirect to another page if needed
    navigate('/reset-password');
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
        <Heading fontSize='2xl' mb={6}>Reset your password</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
              {errors.email && <Box color="red.500">{errors.email.message}</Box>}
              <Text fontSize='md' mt={2} color='red'>
                There is no account with this email.{' '}
                <Link color="blue.400" onClick={() => navigate('/register')}>
                  Sign up
                </Link>
              </Text>
            </FormControl>

            <Button borderRadius='full' bgColor='blue.550' type="submit">Reset Password</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
