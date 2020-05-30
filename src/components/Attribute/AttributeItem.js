import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Loader, Icon, Header } from 'semantic-ui-react';

import AttributeForm from './AttributeForm';
import { GET_ATTRIBUTES, DELETE_ATTRIBUTE } from '../../query';

const renderIcon = ({ loading, attribute, deleteItem }) => {
  if (loading) {
    return <Loader active inline />;
  }
  return (
    <div>
      <AttributeForm type="edit" attribute={attribute} />
      <Icon
        name="delete"
        size="big"
        link
        onClick={() => deleteItem(attribute.id)}
      />
    </div>
  );
};

const AttributeItem = ({ attribute }) => {
  const [deleteAttribute, { loading }] = useMutation(DELETE_ATTRIBUTE, {
    refetchQueries: [{ query: GET_ATTRIBUTES }],
    awaitRefetchQueries: true,
    onError: (e) => {
      console.log(e);
    },
  });

  const deleteItem = (id) => {
    deleteAttribute({
      variables: {
        id,
      },
    });
  };

  return (
    <li>
      <div className="attribute-list__item">
        <div>
          <Header as="h4">Название</Header>
          <span>{attribute.name}</span>
        </div>
        <div>
          <Header as="h4">Название на англ.</Header>
          <span>{attribute.key}</span>
        </div>
        <div>
          <Header as="h4">Единица измерения</Header>
          <span>{attribute.unit}</span>
        </div>
      </div>
      {renderIcon({ loading, attribute, deleteItem })}
    </li>
  );
};

export default AttributeItem;
