import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY, CURRENT_USER_QUERY } from './../graphql'
import { Search } from 'components/molecules'
import { Layout, ButtonAction, Logo } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';
import cleanDeep from 'clean-deep'
import { withApollo } from '../apollo/client';
import Link from 'next/link'

const orderByDefault = { field: 'createdAt', sort: 'desc' }

const Index = () => {
  const limit = 4;
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState(orderByDefault);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    input: {
      orderBy: {
        field: "createdAt",
        sort: "desc",
      },
    },
  });

  const { data, loading, error, fetchMore } = useQuery(
    USERS_QUERY,
    {
      variables: {
        ...cleanDeep(filters),
        pagination: {
          limit,
          page: 1,
        },
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );
  const { data: user } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-only',
  })

  const hasNextPage = data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage;

  function handleFetchMore() {
    fetchMore({
      variables: {
        ...cleanDeep(filters),
        pagination: {
          limit,
          page: page + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          ...prev,
          users: {
            ...fetchMoreResult.users,
            list: [
              ...prev.users.list,
              ...fetchMoreResult.users.list,
            ],
          },
        });
      },
    })
    if (hasNextPage) setPage(page + 1);
  }

  useEffect(() => {
    setFilters({
      ...filters,
      input: cleanDeep({
        ...filters.input,
        categories,
        name: search,
        orderBy,
      }),
    })
  }, [orderBy, categories, search])


  const handleChangeCategories = (value) => {
    setCategories([value])
  }

  const handleChangeSearch = (value) => {
    setSearch(value)
  }

  const handleChangeOrder = (value) => {
    setOrderBy(value === '' ? orderByDefault : {...orderBy, sort: value})
  }

  return (
    <Layout title={<Title />} description={<Description showAction={!user} />}>
      <div className="volunteers">
        <div className="volunteers__sidebar">
          <FilterOrder handleChange={handleChangeOrder} />
          <FilterCategories searchEnabled handleChange={handleChangeCategories} title='competências' />
          <Search title='procurar por' desc='todos os voluntários' handleChange={handleChangeSearch} />
        </div>
        <VolunteersList
          data={data}
          loading={loading}
          error={error}
          handleFetchMore={handleFetchMore}
          hasNextPage={hasNextPage}
          hasMore={data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage}
        />
      </div>
    </Layout>
  );
};


const Title = () => {
  return (
    <div className="logo">
      <h1>
        <Logo height={58} />
        <span className="logo--rest">
          oluntários
        </span>
      </h1>
      <style jsx>
        {`
          @import "assets/styles/mixins.scss";
          .logo {
            h1 {
              display: flex;
              align-items: baseline;
              font-size: var(--size-xl9);
              @include screen(md) {
                font-size: var(--size-xl7);
              }
            }
            &--rest {
              transform: translate(-10px, -2px);
            }
          }
        `}
      </style>
    </div>
  )
}

const Description = ({ showAction = true }) => {
  return (
    <div className={showAction && 'hero__description--action'}>
      <p>Plataforma Online do Voluntariado Português</p>
      {showAction && (
          <Link href="/sign-up">
            <a>
              <ButtonAction className="btn--stretch">
                Voluntariar
              </ButtonAction>
            </a>
        </Link>
      )}
      <style jsx>
        {`
          @import "assets/styles/mixins.scss";
          a {
            display: flex;
          }
          @include screen(md) {
            a {
              width: 100%;
            }
            .btn--action {
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default withApollo({ ssr: false })(Index);
