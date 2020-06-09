import React, { useState } from 'react';
import { Menu, Button, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import slugify from 'slugify';

import ListItem from './ListItem';
import { GET_PRODUCTS, CREATE_MANY } from '../../../../query';
import { transformAttributes } from '../helpers';

import './VariableProductForm.scss';

const initialProductState = (currentProduct) => {
  if (currentProduct.id) {
    const {
      categories,
      brand,
      price,
      promoPrice,
      description,
      availability,
      images,
      attributes,
      variableAttribute,
    } = currentProduct;
    return {
      id: Math.random(),
      main: true,
      name: 'Новый товар',
      categories: categories.map((c) => c.id),
      brand: brand.id,
      price,
      promoPrice,
      description,
      availability,
      images,
      attributes: transformAttributes(attributes) || [],
      variableAttribute,
    };
  }
  return {
    id: Math.random(),
    main: true,
    name: 'Новый товар',
    categories: [],
    brand: '',
    price: 0,
    promoPrice: 0,
    description: '',
    availability: true,
    images: [],
    attributes: [],
    variableAttribute: '',
  };
};

const VariableProductForm = ({
  categoryOptions,
  brandOptions,
  attributeOptions,
  history,
  currentProduct,
}) => {
  const [products, setProducts] = useState([
    initialProductState(currentProduct),
  ]);
  const [activeItem, setActiveItem] = useState(products[0].id);
  const [error, setError] = useState('');

  const [createMany, { createLoading }] = useMutation(CREATE_MANY, {
    refetchQueries: [
      {
        query: GET_PRODUCTS,
        variables: { from: 0, to: 10 },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      history.push('/catalog');
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleItemClick = (e, { id }) => {
    setActiveItem(id);
  };

  const addProduct = () => {
    const id = Math.random();
    setProducts([
      ...products,
      {
        ...products[0],
        id,
        main: false,
      },
    ]);
    setActiveItem(id);
  };

  const deleteProduct = (id) => {
    setProducts([...products.filter((p) => p.id !== id)]);
    setActiveItem(products[0].id);
  };

  const updateProduct = (field, value) => {
    setProducts([
      ...products.map((p) => {
        if (p.id === activeItem) {
          return {
            ...p,
            [field]: value,
          };
        }
        return p;
      }),
    ]);
  };

  const createProducts = () => {
    let err = false;
    products.forEach((p) => {
      const { name, categories, brand, description, availability, images } = p;

      if (
        !name ||
        !categories[0] ||
        !brand ||
        !description ||
        !availability ||
        images.length === 0 ||
        !images[0].small
      ) {
        setError('Заполните обязательные поля');
        err = true;
        return;
      }
    });

    if (err) return;

    let newProducts = products.map(
      ({
        name,
        categories,
        brand,
        price,
        promoPrice,
        description,
        availability,
        images,
        attributes,
      }) => ({
        name,
        slug: slugify(name).toLowerCase(),
        categories: categories.filter((cat) => cat !== 'empty'),
        brand,
        price: Number(price),
        promoPrice: Number(promoPrice),
        description,
        availability,
        images: images.map(({ medium, small }) => ({ medium, small })),
        attributes: attributes
          .filter((at) => at.attribute)
          .map(({ attribute, input }) => ({
            attribute,
            value: input,
          })),
      })
    );

    const varAttr = attributeOptions.find(
      (attr) => attr.id === products[0].variableAttribute
    );

    let relatedProducts = [];

    if (newProducts.length > 1) {
      relatedProducts = newProducts.map((item) => {
        return {
          name: item.name,
          slug: item.slug,
          attribute: {
            id: varAttr.id,
            name: varAttr.name,
            unit: varAttr.unit,
            value: item.attributes.find((a) => a.attribute === varAttr.id)
              .value,
          },
        };
      });
    }

    newProducts = newProducts.map((prod) => ({
      ...prod,
      relatedProducts,
    }));

    createMany({
      variables: {
        input: newProducts,
      },
    });
  };

  const activeProduct = products.find((p) => p.id === activeItem);

  return (
    <div className="VariableProductForm">
      <Menu attached="top" tabular className="VariableProductForm-menu">
        {products.map((item) => (
          <Menu.Item
            key={item.id}
            name={`${item.name}`}
            id={item.id}
            active={activeItem === item.id}
            onClick={handleItemClick}
          />
        ))}
        <Menu.Item>
          <Button
            onClick={() => {
              if (!products[0].variableAttribute) {
                setError('Добавьте сначала вариабельный признак');
                return;
              }
              addProduct();
            }}
          >
            Добавить опцию
          </Button>
          <Confirm
            content={error}
            open={Boolean(error)}
            onCancel={() => setError('')}
            onConfirm={() => setError('')}
          />
        </Menu.Item>
      </Menu>
      <ListItem
        product={activeProduct}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        attributeOptions={attributeOptions}
      />
      <div>
        <Button onClick={createProducts} loading={createLoading}>
          Создать
        </Button>
      </div>
    </div>
  );
};

export default VariableProductForm;
