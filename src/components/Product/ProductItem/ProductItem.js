import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Image, Header, List, Button } from 'semantic-ui-react';

import { GET_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS } from '../../../query';
import Layout from '../../Layout';
import './index.scss';

const ProductItem = ({ match, location, history }) => {
  const { slug } = match.params;

  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  });

  const { state = {} } = location;

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: {
          from: state.from || 0,
          to: state.to || 10,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      history.goBack();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  if (loading) {
    return <Layout>Loading</Layout>;
  }

  const {
    id,
    name,
    images,
    categories,
    brand,
    price,
    promoPrice,
    description,
    seoTitle,
    seoDescription,
    availability,
    attributes,
  } = data.getProduct;

  const deleteHandler = () => {
    deleteProduct({
      variables: {
        id,
      },
    });
  };
  return (
    <Layout>
      <Header size="large">{name}</Header>
      <Link to={`/products/${slug}/edit`}>Редактировать</Link>
      <Button onClick={deleteHandler}>Удолить</Button>
      <div className="product-item__image-list">
        {images.map((image) => (
          <Image key={image.small} src={image.small} size="small" />
        ))}
      </div>
      <List>
        <List.Item>Категория: {categories[0].name}</List.Item>
        <List.Item>Производитель: {brand.name}</List.Item>
        <List.Item>Цена: {price}</List.Item>
        <List.Item>Цена со скидкой: {promoPrice}</List.Item>
        <List.Item>Описание: {description}</List.Item>
        <List.Item>SEO title: {seoTitle}</List.Item>
        <List.Item>SEO description: {seoDescription}</List.Item>
        <List.Item>Наличие: {availability.toString()}</List.Item>
        <List.Item>
          Характеристики:
          <List>
            {attributes.map((attribute) => (
              <List.Item key={attribute.attribute.id}>
                {attribute.attribute.name}: {attribute.value}{' '}
                {attribute.attribute.unit}
              </List.Item>
            ))}
          </List>
        </List.Item>
      </List>
    </Layout>
  );
};

export default ProductItem;
