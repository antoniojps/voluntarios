import { useState, useEffect, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from './../graphql'
import { Search } from 'components/molecules'
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';

const Index = () => {
  const limit = 4;
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    "input": {
      "name": "",
      "categories": [],
      "orderBy": {
        "field": "createdAt",
        "sort": "desc",
      },
    },
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      setPage(page + 1)
    }
  }

  const { data, loading, error, fetchMore } = useQuery(
    USERS_QUERY,
    {
      variables: {
        ...filters,
        pagination: {
          limit,
          page: 1,
        },
      },
    },
  );

  function handleFetchMore() {
    fetchMore({
      variables: {
        ...filters,
        pagination: {
          limit,
          page: page + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          users: {
            ...prev.users,
            list: [
              ...prev.users.list,
              ...fetchMoreResult.users.list,
            ],
          },
        });
      },
    })

    setPage(page + 1);
  }


  useEffect(() => {
    setFilters({
      ...filters,
      input: {
        ...filters.input,
        categories: categories,
        name: search,
        orderBy: {
          ...filters.input.orderBy,
          sort: order,
        },
      },
    })
  }, [order, categories, search])

  return (
    <Layout title="Voluntários" description={<Description />}>
      <div className="volunteers">
        <div className="volunteers__sidebar">
          <FilterOrder searchEnabled handleChange={setOrder} />
          <FilterCategories searchEnabled handleChange={(id) => setCategories([id])} title='competências' />
          <Search title='procurar por' desc='todos os voluntários' handleChange={setSearch} />
        </div>
        <VolunteersList data={data} loading={loading} error={error} handleFetchMore={handleFetchMore} />
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
