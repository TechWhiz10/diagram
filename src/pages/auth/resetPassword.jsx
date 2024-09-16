import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Confirm password is required'),
});

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle password reset
    toast({
      title: 'Password Reset Successful',
      description: 'Your password has been reset successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
    // Redirect to login or another page
    navigate('/login');
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
        <Heading fontSize='2xl' mb={6}>Reset Password</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.newPassword}>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <InputGroup>
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  {...register('newPassword')}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.newPassword && <Box color="red.500">{errors.newPassword.message}</Box>}
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

            <Button borderRadius='full' bgColor='blue.550' type="submit">Reset Password</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
