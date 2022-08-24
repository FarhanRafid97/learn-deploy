import { getCsrfToken } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function Login({ csrfToken }) {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Container className="mt-3">
      <Head>
        <title>Login</title>
      </Head>

      <h1>Login</h1>

      {error && error === 'CredentialsSignin' && (
        <Alert variant="danger">Username atau Password salah!</Alert>
      )}

      <Form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
