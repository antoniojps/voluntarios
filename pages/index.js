import { withApollo } from '../graphql/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

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
  const { data, loading } = useQuery(CurrentUserQuery);

  if (data && data.currentUser) {
    return (
      <div className="container">
        <p>Hey!</p>
        <div>
          You're signed in as {data.currentUser.email} with id $
          {data.currentUser._id} goto{' '}
          <Link href="/sobre">
            <a>static</a>
          </Link>{' '}
          page.
        </div>
        <div style={{ paddingTop: '12px' }}>
          <Link href="/sign-out">
            <button>
              <a>log out</a>
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
        <p>Hey stranger!</p>
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
