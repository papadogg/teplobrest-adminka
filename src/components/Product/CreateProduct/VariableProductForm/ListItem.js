import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import ProductForm from './ProductForm';

import './ListItem.scss';

const ListItem = ({
  product = {},
  deleteProduct,
  updateProduct,
  categoryOptions,
  brandOptions,
  attributeOptions,
}) => {
  const { id, main } = product;
  return (
    <Segment attached="bottom">
      {main ? (
        <div className="ListItem-insteadOf-btn" />
      ) : (
        <Button onClick={() => deleteProduct(id)}>Удалить</Button>
      )}
      <ProductForm
        product={product}
        updateProduct={updateProduct}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        attributeOptions={attributeOptions}
        main={main}
      />
    </Segment>
  );
};

export default ListItem;
