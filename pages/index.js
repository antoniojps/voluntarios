import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

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
      <div className="container">
        <div className="row">
          <h1>Logged in</h1>
        </div>
        <div className="row">
          <p>Email: {data.currentUser.email}</p>
          You're signed in as {data.currentUser.email} with id $
          {data.currentUser._id} goto{' '}
          <Link href="/about">
            <a>static</a>
          </Link>{' '}
          page.
        </div>
        <div className="row" style={{ paddingTop: '12px' }}>
          <Link href="/signout">
            <button>
              <a>signout</a>
            </button>
          </Link>
        </div>
      </div>
    );
  }
  if (loading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="container">
      <p>User not found...</p>
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
