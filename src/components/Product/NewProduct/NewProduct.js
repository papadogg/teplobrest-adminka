import React, { useState } from 'react';
import Select from 'react-select';

import Layout from '../../Layout';
import Attibutes from './Attributes';
import './index.scss';

const productTypes = [
  { value: 'boiler', label: 'Котлы' },
  { value: 'heater', label: 'Водонагреватели' },
];

const NewProduct = () => {
  const [name, setName] = useState('');
  const [productType, setProductType] = useState({});
  const [attributes, setAttributes] = useState({});
  const [price, setPrice] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    const product = {
      name,
      productType: productType.value,
      price: Number(price),
      attributes: Object.keys(attributes).map((attr) => ({
        [attr]: attributes[attr].value,
      })),
    };
    console.log(product);
  };
  return (
    <Layout>
      <h1>New Product</h1>
      <div className="new-product">
        <form onSubmit={onSubmit}>
          <div>
            <label>Название</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Тип продукта</label>
            <Select
              value={productType}
              onChange={(option) => {
                setProductType(option);
              }}
              options={productTypes}
            />
          </div>
          {productType.value && (
            <Attibutes
              productType={productType.value}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          )}
          <div>
            <label>Цена</label>
            <input
              value={price}
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <button>Создать</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewProduct;
