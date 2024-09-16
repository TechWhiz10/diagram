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
  Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm password is required'),
  terms: yup.boolean().oneOf([true], 'Must agree to terms to continue')
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle form submission
    toast({
      title: 'Registration Successful',
      description: 'You have successfully registered.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Container maxW="lg" centerContent>
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading fontSize='2xl' mb={6}>Create an account</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input id="firstName" placeholder="First Name" {...register('firstName')} />
                {errors.firstName && <Box color="red.500">{errors.firstName.message}</Box>}
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input id="lastName" placeholder="Last Name" {...register('lastName')} />
                {errors.lastName && <Box color="red.500">{errors.lastName.message}</Box>}
              </FormControl>
            </Stack>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" placeholder="Email" {...register('email')} />
              {errors.email && <Box color="red.500">{errors.email.message}</Box>}
              <Text fontSize='md' mt={2} color='red'>
                An account with this email already exists.{' '}
                <Link color="blue.400" onClick={() => navigate('/login')}>
                  Sign in
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

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && <Box color="red.500">{errors.confirmPassword.message}</Box>}
            </FormControl>

            <FormControl isInvalid={!!errors.terms}>
              <Checkbox id="terms" {...register('terms')}>
                I agree to the terms and conditions
              </Checkbox>
              {errors.terms && <Box color="red.500">{errors.terms.message}</Box>}
            </FormControl>

            <Button borderRadius='full' bgColor="blue.550" type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
