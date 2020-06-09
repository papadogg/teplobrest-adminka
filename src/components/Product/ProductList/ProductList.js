import React, { useState } from 'react';
import { Table, Checkbox, Image, Pagination } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import qs from 'query-string';
import { Link } from 'react-router-dom';

import Layout from '../../Layout';
import { GET_PRODUCTS } from '../../../query';
import './index.scss';

const INITIAL_PAGE_SIZE = 10;

const ProductList = (props) => {
  const { page = 1, pagesize = INITIAL_PAGE_SIZE } = qs.parse(
    props.location.search
  );

  const { slug } = props.match.params;

  const [activePage, setActivePage] = useState(page);
  const [size, setSize] = useState(pagesize);

  const from = page === 1 ? 0 : page * pagesize - pagesize;
  const to = page * pagesize;

  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      slug,
      from,
      to,
    },
  });

  if (loading) {
    return <Layout>Loading</Layout>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const query = { pagesize: size };
    setActivePage(1);
    props.history.push({
      pathname: `/catalog${slug ? '/' + slug : ''}`,
      search: qs.stringify(query),
    });
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
    const query = {
      page: activePage > 1 ? activePage : undefined,
      pagesize: pagesize !== INITIAL_PAGE_SIZE ? pagesize : undefined,
    };
    // props.history.push(activePage > 1 ? `?page=${activePage}` : `/products`);
    props.history.push({
      pathname: `/catalog${slug ? '/' + slug : ''}`,
      search: qs.stringify(query),
    });
  };

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        Колличество товаров на странице
        <input value={size} onChange={(e) => setSize(e.target.value)} />
        <button type="submit">ОК</button>
      </form>
      <Table celled className="product-list">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Категория</Table.HeaderCell>
            <Table.HeaderCell>Производитель</Table.HeaderCell>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.HeaderCell>Наличие</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.getProducts.products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>
                <div className="product-list__with-image">
                  <div className="product-list__text">
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                  </div>
                  <Image src={product.images[0].small} size="small" />
                </div>
                <div>
                  <Link to={`/products/${product.slug}/copy`}>Копировать</Link>
                </div>
                <div>
                  <Link to={`/products/${product.slug}/edit`}>
                    Редактировать
                  </Link>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Link to={`/catalog/${product.categories[0].key}`}>
                  {product.categories[0].name}
                </Link>
              </Table.Cell>
              <Table.Cell>{product.brand.name}</Table.Cell>
              <Table.Cell>
                <div>
                  <div>{product.price} eur</div>
                  <div>Со скидкой - {product.promoPrice} eur</div>
                </div>
                <div>
                  <div>{product.priceRub} руб</div>
                  <div>Со скидкой - {product.promoPriceRub} руб</div>
                </div>
              </Table.Cell>
              <Table.Cell>
                {product.availability === true ? 'Есть' : 'Нет'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        totalPages={Math.ceil(data.getProducts.total / pagesize)}
        onPageChange={handlePaginationChange}
      />
    </Layout>
  );
};

export default ProductList;
