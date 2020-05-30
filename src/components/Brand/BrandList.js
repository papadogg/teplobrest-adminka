import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import { GET_BRANDS } from '../../query';
import Layout from '../Layout';
import BrandItem from './BrandItem';
import BrandForm from './BrandForm';
import './index.scss';

const BrandList = () => {
  const { data, loading } = useQuery(GET_BRANDS);

  if (loading) {
    return (
      <Layout>
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid centered columns={2} className="brand-list">
        <Grid.Column>
          Сделать удаление всех товаров производителя при удалении производителя
          <br />
          Сделать редактирование производителя и всех товаров
          <ul>
            {data.getBrands.map((brand) => (
              <BrandItem key={brand.id} brand={brand} />
            ))}
          </ul>
          <div className="brand-list__add-field">
            <span>Добавить производителя</span>
            <BrandForm />
          </div>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default BrandList;
