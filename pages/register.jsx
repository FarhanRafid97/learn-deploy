import { useState } from 'react';
import Head from 'next/head';
import { Container, Form, Button } from 'react-bootstrap';
import { signIn } from 'next-auth/react';
import { fetchApi } from '../utils/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    const response = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    });

    if (response.ok) {
      await signIn('credentials', { username, password, callbackUrl: '/' });
      setLoading(false);
    } else {
      const data = await response.json();

      setLoading(false);

      if (data && data.error) {
        if (data.error.code === 'auth/user-exists') {
          alert('User sudah ada, silahkan login!');
          signIn(undefined, { callbackUrl: '/' });
        }
      }
    }
  }

  return (
    <Container className="mt-3">
      <Head>
        <title>Register</title>
      </Head>

      <h1>Register</h1>

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
}
