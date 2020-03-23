import { withApollo } from '../apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import { USERS_QUERY } from './../graphql'

const Index = () => {
  const { data, loading, error } = useQuery(
    USERS_QUERY,
    {
      variables: {
        input: {},
        pagination: {
          limit: 5,
          page: 1,
        },
      },
    },
  );

  const volunteers = data && data.users && data.users.list ? data.users.list : []

  return (
    <Layout title="Voluntários" description={<Description />}>
      <VolunteersList loading={loading} error={error} volunteers={volunteers} />
    </Layout>
  );
};

const Description = () => (
  <div className="hero__description--action">
    <p>Plataforma Online do Voluntariado Português</p>
    <ButtonAction>
      Sou um voluntário
    </ButtonAction>
  </div>
)

export default withApollo({ ssr: false })(Index);
