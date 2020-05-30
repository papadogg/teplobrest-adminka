import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Layout from '../Layout';
import { GET_ORDER, UPDATE_ORDER, GET_ORDERS } from '../../query';

import './index.scss';

const OrderItem = ({ match }) => {
  const { id } = match.params;
  const { data, loading } = useQuery(GET_ORDER, {
    variables: {
      id,
    },
  });

  const order = data?.getOrder || {};

  const [updateOrder] = useMutation(UPDATE_ORDER, {
    refetchQueries: [
      {
        query: GET_ORDER,
        variables: {
          id,
        },
      },
      {
        query: GET_ORDERS,
      },
    ],
    awaitRefetchQueries: true,
    onError: (e) => {
      console.log(e);
    },
  });

  if (loading) {
    return <Layout>Loading</Layout>;
  }

  const setProcessed = () => {
    updateOrder({
      variables: {
        input: {
          id,
          processed: !order.processed,
        },
      },
    });
  };

  return (
    <Layout>
      <div>Обработан - {order.processed ? 'Да' : 'Нет'}</div>
      <div>Имя - {order.name}</div>
      <div>Телефон - {order.phone}</div>
      <div>Адрес - {order.address}</div>
      <div>Сообщение - {order.message}</div>
      <div>
        Товары:
        <ul>
          {order.products.map(({ product, count }) => (
            <li key={product.id}>
              <a
                href={`/products/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.name}
              </a>{' '}
              - <span>{count} Штуки</span>
            </li>
          ))}
        </ul>
      </div>
      <div>Всего - {order.totalPrice} руб</div>
      <button onClick={setProcessed}>
        {order.processed ? 'Отменить' : 'Отметить как обработанный'}
      </button>
    </Layout>
  );
};

export default OrderItem;
