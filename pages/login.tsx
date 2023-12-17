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


const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const handleLogin = async (values : any) => {
    try {
      const response = await axios.post('/login', values);
      console.log(response.data);
      if(response.data.success) {
        const tim = new Date(Date.now() + 1000000000);
        Cookies.set("account" , response.data.account, { expires: tim });
        Cookies.set("email" , values.email, { expires: tim });
        showNotification({
          title: "Logged In",
          message: "Log in successful",
          color: "teal",
          autoClose: 5000,
        });
        router.push('./dashboard');    
      } else {
        console.log("Invalid!!")
        showNotification({
          title: "Invalid information",
          message: "Your email/pass is incorrect",
          color: "red",
          autoClose: 5000,
        });
      }
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className='main'>
       <form onSubmit={form.onSubmit(handleLogin)}>
      <Container size={520} my={60}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 500 })}
      >
        <h2>Welcome back!</h2>
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required  {...form.getInputProps('email')} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm" color="gray">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type='submit'>
          Sign in
        </Button>
      </Paper>
    </Container>
    </form>
    </div>
  );
};

export default LoginPage;
