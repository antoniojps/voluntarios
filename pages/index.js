import { useState, useEffect } from 'react';
import { Search } from 'components/molecules'
import { withApollo } from '../apollo/client';
import { Layout, ButtonAction } from 'components/atoms'
import { VolunteersList } from 'components/organisms'
import FilterCategories from '../hocs/FilterCategories/FilterCategories';
import FilterOrder from '../hocs/FilterOrder/FilterOrder';

const Index = () => {
  const [order, setOrder] = useState('');
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
    "pagination": {
      "limit": 5,
      "page": 1,
    },
  });

  useEffect(() => {
    setTimeout(() => setFilters({
      ...filters,
      input: {
        ...filters.input,
        name: search,
      },
    }), 300)
  }, [search])

  useEffect(() => {
    setFilters({
      ...filters,
      input: {
        ...filters.input,
        categories: categories,
      },
    })
  }, [categories])

  useEffect(() => {
    setFilters({
      ...filters,
      input: {
        ...filters.input,
        orderBy: {
          ...filters.input.orderBy,
          sort: order,
        },
      },
    })
  }, [order])

  return (
    <Layout title="Voluntários" description={<Description />}>
      <div className="volunteers">
        <div className="volunteers__sidebar">
          <FilterOrder searchEnabled handleChange={setOrder} />
          <FilterCategories searchEnabled handleChange={(id) => setCategories([id])} title='competências' />
          <Search title='procurar por' desc='todos os voluntários' handleChange={setSearch} />
        </div>
        <VolunteersList filters={filters} />
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

export default withApollo({ ssr: false })(Index);
