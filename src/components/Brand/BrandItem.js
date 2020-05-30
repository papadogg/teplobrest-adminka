import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Loader, Icon } from 'semantic-ui-react';

import { GET_BRANDS, DELETE_BRAND } from '../../query';

const renderIcon = ({ loading, id, deleteItem }) => {
  if (loading) {
    return <Loader active inline />;
  }
  return <Icon name="delete" size="big" link onClick={() => deleteItem(id)} />;
};

const BrandItem = ({ brand }) => {
  const [deleteBrand, { loading }] = useMutation(DELETE_BRAND, {
    refetchQueries: [{ query: GET_BRANDS }],
    awaitRefetchQueries: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const deleteItem = (id) => {
    deleteBrand({
      variables: {
        id,
      },
    });
  };
  return (
    <li>
      <span>{brand.name}</span>
      {renderIcon({ loading, id: brand.id, deleteItem })}
    </li>
  );
};

export default BrandItem;
