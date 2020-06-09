import React, { useState } from 'react';
import {
  Button,
  Form,
  Dropdown,
  Checkbox,
  Image,
  List,
  Icon,
  Grid,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import BrandForm from '../../Brand/BrandForm';
import AttributeForm from '../../Attribute/AttributeForm';
import ImageWidget from '../../Image/ImageWidget';
import AttributeItem from './VariableProductForm/AttributeItem';
import CategoriesSelector from './CategoriesSelector';
import Editor from './Editor';
import { CREATE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from '../../../query';
import { transformOptions, transformAttributes } from './helpers';

const ProductForm = ({
  categoryOptions = [],
  brandOptions = [],
  attributeOptions = [],
  history,
  currentProduct = {},
}) => {
  const [error, setError] = useState('');
  const [name, setName] = useState(currentProduct.name || '');
  const [categories, setCategories] = useState(
    currentProduct.categories.map((c) => c.id) || []
  );
  const [brand, setBrand] = useState(currentProduct.brand.id || '');
  const [price, setPrice] = useState(currentProduct.price || 0);
  const [promoPrice, setPromoPrice] = useState(currentProduct.promoPrice || 0);
  const [description, setDescription] = useState(
    currentProduct.description || ''
  );

  const [availability, setAvailability] = useState(
    currentProduct.availability || true
  );
  const [images, setImages] = useState(currentProduct.images || []);
  const [attributes, setAttributes] = useState(
    transformAttributes(currentProduct.attributes) || []
  );

  const setMainImage = (image) => {
    setImages((prevState) => [image, ...prevState.slice(1)]);
  };

  const updateImages = (image) => {
    setImages((prevState) => [...prevState, image]);
  };

  const deleteImage = (id) => {
    setImages((prevState) => prevState.filter((img) => img.id !== id));
  };

  const deleteMainImage = (id) => {
    setImages((prevState) => [{}, ...prevState.slice(1)]);
  };

  const addAttribute = () => {
    const id = Math.random();
    setAttributes((prevState) => [
      ...prevState,
      {
        id,
        key: id,
      },
    ]);
  };

  const [createProduct, { createLoading }] = useMutation(CREATE_PRODUCT, {
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

  const [updateProduct, { updateLoading }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS, variables: { from: 0, to: 10 } }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      history.push(`/products/${data.updateProduct.slug}`);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const product = {
      id: currentProduct.id,
      name,
      categories: categories.filter((cat) => cat !== 'empty'),
      brand,
      price: Number(price),
      promoPrice: Number(promoPrice),
      description,
      availability,
      images: images.map(({ medium, small }) => ({ medium, small })),
      attributes: attributes.map(({ attribute, input }) => ({
        attribute,
        value: input,
      })),
    };

    if (
      !name ||
      !categories[0] ||
      !brand ||
      !description ||
      !availability ||
      !images[0].small
    ) {
      setError('Заполните обязательные поля');
      return;
    }

    if (currentProduct.id) {
      const newRelatedProducts = (currentProduct.relatedProducts || []).map(
        (p) => ({
          name: p.name,
          slug: p.slug,
          attribute: {
            id: p.attribute.id,
            name: p.attribute.name,
            unit: p.attribute.unit,
            value: p.attribute.value,
          },
        })
      );

      product.relatedProducts = newRelatedProducts;
      product.oldSlug = currentProduct.slug;
      updateProduct({
        variables: {
          input: product,
        },
      });
    } else {
      createProduct({
        variables: {
          input: product,
        },
      });
    }
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Название*</label>
            <input
              value={name}
              placeholder="Название"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <CategoriesSelector
            categories={categories}
            setCategories={setCategories}
            categoryOptions={categoryOptions}
          />
          <Form.Field>
            <label>Производитель*</label>
            <div className="with-plus">
              <Dropdown
                placeholder="Производитель"
                value={brand}
                fluid
                search
                selection
                options={transformOptions(brandOptions)}
                onChange={(e, { value }) => setBrand(value)}
              />
              <BrandForm />
            </div>
          </Form.Field>
          <Form.Field>
            <label>Цена*</label>
            <input
              value={price}
              placeholder={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Цена со скидкой*</label>
            <input
              value={promoPrice}
              placeholder={0}
              onChange={(e) => setPromoPrice(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Описание*</label>
            <Editor
              text={description}
              onChange={(value) => setDescription(value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Наличие*</label>
            <Checkbox
              checked={availability}
              label="В наличии"
              onChange={(e) => setAvailability(!availability)}
            />
          </Form.Field>
          <Form.Field>
            <label>Главное изображение*</label>
            {images.length > 0 && images[0].small && (
              <div className="product-form__image-item">
                <Image src={images[0].small} />
                <Icon
                  name="delete"
                  size="big"
                  circular
                  inverted
                  link
                  onClick={deleteMainImage}
                />
              </div>
            )}
            <ImageWidget setImages={setMainImage} />
          </Form.Field>
          <Form.Field>
            <label>Дополнительные изображения</label>
            <List horizontal>
              {images.slice(1).map((image) => (
                <List.Item className="product-form__image-item" key={image.id}>
                  <Image src={image.small} />
                  <Icon
                    name="delete"
                    size="big"
                    circular
                    inverted
                    link
                    onClick={() => deleteImage(image.id)}
                  />
                </List.Item>
              ))}
            </List>
            <ImageWidget setImages={updateImages} />
          </Form.Field>
          <Form.Field>
            <div>
              <label>Характеристики</label>
              <AttributeForm />
            </div>
            {attributes.map((attribute) => {
              return (
                <AttributeItem
                  attributes={attributes}
                  attribute={attribute}
                  setAttributes={setAttributes}
                  options={transformOptions(attributeOptions)}
                />
              );
            })}
            <Button type="button" onClick={addAttribute}>
              Добавить
            </Button>
          </Form.Field>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className="product-form__create-btn">
            <Button type="submit" loading={createLoading || updateLoading}>
              Создать
            </Button>
          </div>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ProductForm;
