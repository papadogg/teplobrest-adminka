import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../../Layout';
import ProductForm from './ProductForm';
import {
  GET_CATEGORIES,
  GET_BRANDS,
  GET_ATTRIBUTES,
  GET_PRODUCT,
} from '../../../query';
import './index.scss';

const CreateProduct = ({ history, match }) => {
  const { slug } = match.params;

  const { data: product, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  });

  const { data: categories, loading: categoryLoading } = useQuery(
    GET_CATEGORIES
  );

  const { data: brands, loading: brandLoading } = useQuery(GET_BRANDS);
  const { data: attributes, loading: attributesLoading } = useQuery(
    GET_ATTRIBUTES
  );

  if (categoryLoading || brandLoading || attributesLoading || productLoading) {
    return <div>Loading</div>;
  }

  const currentProduct =
    match.path !== '/products/new'
      ? product.getProduct
      : {
          categories: [],
          brand: {},
        };

  return (
    <Layout>
      <Grid centered columns={2}>
        <Grid.Column>
          <h2>{`${
            !currentProduct.id ? 'Создание' : 'Рекдактирование'
          } продукта`}</h2>
          <ProductForm
            categoryOptions={categories.getCategories}
            brandOptions={brands.getBrands}
            attributeOptions={attributes.getAttributes}
            history={history}
            currentProduct={currentProduct}
          />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default CreateProduct;
