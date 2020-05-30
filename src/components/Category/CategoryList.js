import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import { GET_CATEGORIES } from '../../query';
import Layout from '../Layout';
import CategoryItem from './CategoryItem';
import './index.scss';

const prepareCategories = (categories) => {
  const sorted = categories
    .slice()
    .sort((a, b) => b.level - a.level)
    .map((c) => ({ ...c }));
  const categoryArray = sorted.slice();

  for (const cat of sorted) {
    const parent = categoryArray.find((c) => c.id === cat.parentId);
    if (parent) {
      parent.categories = parent.categories
        ? [...parent.categories, cat]
        : [cat];
    }
  }
  const topCategories = categoryArray.filter((c) => c.parentId === 'catalog');
  return topCategories;
};

const CategoryList = () => {
  const { data: categories, loading: catLoading } = useQuery(GET_CATEGORIES);

  if (catLoading) {
    return (
      <Layout>
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      </Layout>
    );
  }

  const topCategories = prepareCategories(categories.getCategories);

  return (
    <Layout>
      <Grid columns={2} className="category-list">
        <Grid.Column>
          Сделать удаление всех товаров при удалении категории
          <br />
          Сделать редактирование категории и всех товаров
          <h2>Категории</h2>
          <div>
            {topCategories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default CategoryList;
