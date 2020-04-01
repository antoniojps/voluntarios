import { useState, useEffect, useRef } from 'react';
import { useGeolocation } from 'react-use';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY, CURRENT_USER_QUERY } from './../graphql'
import { Search } from 'components/molecules'
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';
import FilterPlaces from '../hocs/FilterPlaces/FilterPlaces';
import cleanDeep from 'clean-deep'
import { withApollo } from '../apollo/client';
import Link from 'next/link'
import { Spacer } from '@zeit-ui/react'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components/atoms'
import Seo from 'containers/Seo'

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
  const [width, setWidth] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [geolocation, setGeolocation] = useState(null);
  const filterCategoriesRef = useRef(null);
  const filterPlacesRef = useRef(null);
  const searchRef = useRef(null);

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

  function hasFilters() {
    return (search !== '' || categories.length > 0 || geolocation !== null);
  }

  function removeFilters() {
    setSearch('');
    setCategories([]);
    setGeolocation(null);
    // force the unselect on categories filter
    if (filterCategoriesRef && filterCategoriesRef.current) {
      filterCategoriesRef.current.removeSelected();
    }
    // force the unselect on places filter
    if (filterPlacesRef && filterPlacesRef.current) {
      filterPlacesRef.current.removeSelected();
    }
    // force the unselect on places filter
    if (searchRef && searchRef.current) {
      searchRef.current.clear();
    }
  }

  useEffect(() => {
    if (process.browser) {
      const w = document.children[0].clientWidth
      setWidth(w);
      setShowFilters(w >= 768);
    }
  }, []);

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
        geolocation,
      }),
    })
  }, [orderBy, categories, search, geolocation])


  const handleChangeCategories = (value) => {
    setCategories([value])
  }

  const handleChangeSearch = (value) => {
    setSearch(value)
  }

  const handleChangeSearchPlaces = (value) => {
    setGeolocation(value)
  }

  const handleChangeOrder = (value) => {
    setOrderBy(value === '' ? orderByDefault : { ...orderBy, sort: value })
  }

  const renderFilters = () => {
    const filters = (
      <div className={`volunteers__sidebar ${showFilters ? '' : 'volunteers__sidebar--hidden'}`} >
        <FilterOrder handleChange={handleChangeOrder} />
        <FilterPlaces title='procurar por' desc='todos os voluntários' handleChange={handleChangeSearchPlaces} geoLocation={useGeolocation()} ref={filterPlacesRef} />
        <FilterCategories searchEnabled handleChange={handleChangeCategories} title='competências' ref={filterCategoriesRef} />
        <Search title='procurar por' desc='todos os voluntários' handleChange={handleChangeSearch} ref={searchRef} />
      </div>
    )

    return (
      <div className='filters'>
        {width && width < 768 && (
          <>
            <button
              style={{ width: 'fit-content' }}
              className='btn--secondary btn--filters'
              onClick={() => setShowFilters(!showFilters)}
            >
              <Icon icon={faFilter} />
              {showFilters ? 'Esconder filtros' : 'Filtrar'}
            </button>
            <Spacer y={1} />
          </>
        )}

        {filters}
      </div>
    )
  }

  return (
    <>
      <Seo title={user ? "Voluntários" : "Voluntários - Inscreve-te!"} shouldAppend={false} />
      <Layout title="Voluntários" description={<Description showAction={!user} />}>
        <div className="volunteers">
          {renderFilters()}
          <VolunteersList
            data={data}
            loading={loading}
            error={error}
            handleFetchMore={handleFetchMore}
            hasNextPage={hasNextPage}
            hasMore={data && data.users && data.users.pageInfo && data.users.pageInfo.hasNextPage}
            hasFilters={hasFilters()}
            removeFilters={removeFilters}
          />
        </div>
      </Layout>
    </>
  );
};

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
