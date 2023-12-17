import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { axios } from 'src/lib/axios';
import { useForm } from '@mantine/form';
import router from 'next/router';
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';


const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      secretKey: '',
      repeatSecretKey: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      repeatPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
      secretKey: (value) => (value.length >= 6 ? null : 'Secret key must be at least 6 characters'),
      repeatSecretKey: (value, values) => (value === values.secretKey ? null : 'Secret keys do not match'),
    },
  });

  const handleRegister = async (values : any) => {
    try {
      const response = await axios.post('/register', values);
      
      if (response.data.success) {
        showNotification({
          title: "Registration done",
          message: "Registration successful",
          color: "teal",
          autoClose: 5000,
        });
        router.push('/login');
      } else {
        console.log('Invalid!!');
        showNotification({
          title: "Invalid information",
          message: "Please provide correct information",
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <div className="main">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Container size={520} my={60}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 500 })}
          >
            <h2>Create an account</h2>
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component="button">
              Sign in
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Repeat Password"
              placeholder="Repeat password"
              required
              mt="md"
              {...form.getInputProps('repeatPassword')}
            />
            <TextInput
              label="Secret Key"
              placeholder="Your secret key"
              required
              mt="md"
              {...form.getInputProps('secretKey')}
            />
            <TextInput
              label="Repeat Secret Key"
              placeholder="Repeat secret key"
              required
              mt="md"
              {...form.getInputProps('repeatSecretKey')}
            />
            <Button fullWidth mt="xl" type="submit">
              Register
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  );
};

export default RegisterPage;
