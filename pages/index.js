import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from './../graphql'
import { Search } from 'components/molecules'
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';
import cleanDeep from 'clean-deep'
import { withApollo } from '../apollo/client';

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
      <style jsx global>{`
        :root {
          /* colors */
          --base: #000;
          --base40: #5a606e;
          --base60: #e1e1e1;
          --base80: #fefefe;
          --baseInverse: #fff;
          --primary: #000;
          --red: #fb6d77;

          --border: #e1e1e1;
          --border20: #f2f2f2;
          --bg: #ffffff;
          --bgPrimary: #000;
          --bgLighter: var(--base60);
          --bgLoading: #ECEBEC;
          --error: var(--red);

          /* font-family */
          --font: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;

          /* paddings and margins */
          --spacing-xs4: 0.3125rem; // 5px
          --spacing-xs3: 0.625rem; // 10px
          --spacing-xs2: 0.9375rem; // 15px
          --spacing-xs: 1.25rem; // 20px
          --spacing-s: 1.5625rem; // 25px
          --spacing-sm: 1.875rem; // 30px
          --spacing-m: 2.1875rem; // 35px
          --spacing-l: 2.5rem; // 40px
          --spacing-xl: 2.8125rem; // 45px
          --spacing-xl1: 3.125rem; // 50px
          --spacing-xl2: 3.4375rem; // 55px
          --spacing-xl3: 3.75rem; // 60px
          --spacing-xl4: 4.0625rem; // 65px
          --spacing-xl5: 6.25rem; // 100px
          --spacing-xl6: 7.8125rem; // 125px

          /* font-size */
          --size-base: 1rem; // 16px
          --size-xs3: 0.5rem; // 8px
          --size-xs2: 0.75rem; // 12px
          --size-xs: 0.875rem; // 14px
          --size-s: 0.9375rem; // 15px
          --size-m: var(--size-base); // 16px
          --size-xl: 1.125rem; // 18px
          --size-xl2: 1.25rem; // 20px
          --size-xl3: 1.375rem; // 22px
          --size-xl4: 1.5rem; // 24px
          --size-xl5: 1.875rem; // 30px
          --size-xl6: 2.5rem; // 40px
          --size-xl7: 3rem; // 48px
          --size-xl8: 3.5rem; // 56px
          --size-xl9: 4rem; // 64px
          --size-xl10: 8rem; // 128px

          --weight-normal: 400;
          --weight-semibold: 500;
          --weight-bold: 600;

          /* other */
          --borderRadius: 3px;
          --borderRadiusSmall: 2px;
        }

        html,
        body {
          font-family: var(--font);
          width: 100%;
          height: 100%;
          font-size: 16px;
          background-color: var(--bg);
          color: var(--base);
        }

        a {
          color: var(--base);
        }

        form {
          display: inline-flex;
          flex-direction: column;
        }

        /* removes input auto-complete blue background */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active  {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          bottom: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: var(--bgLighter);
          border-left-color: var(--bgLighter);
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

      `}
      </style>
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
