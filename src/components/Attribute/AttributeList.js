import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import { GET_ATTRIBUTES } from '../../query';
import Layout from '../Layout';
import AttributeItem from './AttributeItem';
import AttributeForm from './AttributeForm';
import './index.scss';

const AttributeList = () => {
  const { data, loading } = useQuery(GET_ATTRIBUTES);

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
      <Grid centered columns={2} className="attribute-list">
        <Grid.Column>
          <ul>
            {data.getAttributes.map((attribute) => (
              <AttributeItem key={attribute.id} attribute={attribute} />
            ))}
          </ul>
          <div className="attribute-list__add-field">
            <span>Добавить характеристику</span>
            <AttributeForm />
          </div>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default AttributeList;
