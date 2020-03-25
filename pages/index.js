import { useState, useEffect, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from './../graphql'
import { Search } from 'components/molecules'
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';
import cleanDeep from 'clean-deep'

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

  const { data, loading, error, fetchMore, refetch, called } = useQuery(
    USERS_QUERY,
    {
      variables: {
        ...cleanDeep(filters),
        pagination: {
          limit,
          page: 1,
        },
      },
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
  );
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

  useEffect(() => {
    if (!called) return;
    refetch(filters)
  }, [filters, called])

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
    <Layout title="Voluntários" description={<Description />}>
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

const Description = () => (
  <div className="hero__description--action">
    <p>Plataforma Online do Voluntariado Português</p>
    <ButtonAction>
      Sou um voluntário
    </ButtonAction>
  </div>
)

export default memo(Index);
