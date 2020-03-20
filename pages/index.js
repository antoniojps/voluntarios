import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'styled-bootstrap-grid';

const CurrentUserQuery = gql`
  query CurrentUserQuery {
    currentUser {
      _id
      email
      username
      admin
      moderator
      verified
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(CurrentUserQuery);

  if (error) {
    router.push('/signin');
  }

  if (data && data.currentUser) {
    return (
      <Container>
        <Row>
          <h1>Logged in</h1>
        </Row>
        <Row>
          <p>Email: {data.currentUser.email}</p>
          You're signed in as {data.currentUser.email} with id $
          {data.currentUser._id} goto{' '}
          <Link href="/about">
            <a>static</a>
          </Link>{' '}
          page.
        </Row>
        <Row style={{ paddingTop: '12px' }}>
          <Link href="/signout">
            <button>
              <a>signout</a>
            </button>
          </Link>
        </Row>
      </Container>
    );
  }
  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  return (
    <Container>
      <p>User not found...</p>
    </Container>
  );
};

export default withApollo({ ssr: true })(Index);
