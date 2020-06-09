import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../../Layout';
import ProductForm from './ProductForm';
import VariableProductForm from './VariableProductForm';
import {
  GET_CATEGORIES,
  GET_BRANDS,
  GET_ATTRIBUTES,
  GET_PRODUCT,
} from '../../../query';
import './index.scss';

const CreateProduct = ({ history, match, variable }) => {
  const { slug } = match.params;

  const { error, data: product, loading: productLoading } = useQuery(
    GET_PRODUCT,
    {
      skip:
        match.path === '/products/new' ||
        match.path === '/products/new-variable',
      variables: {
        slug,
      },
    }
  );

  const { data: categories, loading: categoryLoading } = useQuery(
    GET_CATEGORIES
  );

  const { data: brands, loading: brandLoading } = useQuery(GET_BRANDS);
  const { data: attributes, loading: attributesLoading } = useQuery(
    GET_ATTRIBUTES
  );

  if (categoryLoading || brandLoading || attributesLoading || productLoading) {
    return <Layout>Loading</Layout>;
  }

  if (error) {
    return <Layout>No such product</Layout>;
  }

  const currentProduct =
    match.path !== '/products/new' && match.path !== '/products/new-variable'
      ? product.getProduct
      : {
          categories: [],
          brand: {},
        };

  return (
    <Layout>
      <Grid centered>
        <Grid.Column>
          <h2>{`${
            !currentProduct.id ? 'Создание' : 'Рекдактирование'
          } продукта`}</h2>
          {!variable ? (
            <ProductForm
              categoryOptions={categories.getCategories}
              brandOptions={brands.getBrands}
              attributeOptions={attributes.getAttributes}
              history={history}
              currentProduct={currentProduct}
            />
          ) : (
            <VariableProductForm
              categoryOptions={categories.getCategories}
              brandOptions={brands.getBrands}
              attributeOptions={attributes.getAttributes}
              history={history}
              currentProduct={currentProduct}
            />
          )}
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default CreateProduct;
