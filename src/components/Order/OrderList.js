import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Layout from '../Layout';
import { GET_ORDERS } from '../../query';

import './index.scss';

const OrderList = () => {
  const { data, loading } = useQuery(GET_ORDERS);

  if (loading) {
    return <Layout>Loading</Layout>;
  }

  const orders = data?.getOrders || [];

  return (
    <Layout>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className={`order-list__item ${
              order.processed
                ? 'order-list__item-processed'
                : 'order-list__item-unprocessed'
            }`}
          >
            <div>
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
            </div>
            <div>
              <Link to={`/orders/${order.id}`}>Подробнее</Link>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default OrderList;
