import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Loader, Icon } from 'semantic-ui-react';

import CategoryForm from './CategoryForm';
import { GET_CATEGORIES, DELETE_CATEGORY } from '../../query';

const renderIcon = ({ loading, category, deleteItem }) => {
  if (loading) {
    return <Loader active inline />;
  }
  return (
    <div>
      <CategoryForm type="edit" category={category} />
      <Icon
        name="delete"
        size="big"
        link
        onClick={() => deleteItem(category.id)}
      />
    </div>
  );
};

const CategoryItem = ({ category }) => {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const deleteItem = (id) => {
    deleteCategory({
      variables: {
        id,
      },
    });
  };

  return (
    <div style={{ marginLeft: `${(category.level - 1) * 50}px` }}>
      <div className="category-list__category-item-wrapper">
        <span>{category.name}</span>
        {renderIcon({ loading, category, deleteItem })}
        <div className="category-list__add-field">
          <span>Добавить категорию</span>
          <CategoryForm parentId={category.parentId} level={category.level} />
        </div>
      </div>
      {category.categories &&
        category.categories.map((c) => (
          <CategoryItem key={c.id} category={c} />
        ))}
    </div>
  );
};

export default CategoryItem;
