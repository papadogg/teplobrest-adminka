import React from 'react';
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

import BrandForm from '../../../Brand/BrandForm';
import AttributeForm from '../../../Attribute/AttributeForm';
import ImageWidget from '../../../Image/ImageWidget';
import AttributeItem from './AttributeItem';
import CategoriesSelector from '../CategoriesSelector';
import Editor from '../Editor';

import { transformOptions } from '../helpers';

import './ProductForm.scss';

const renderPickVariable = ({
  main,
  attribute,
  updateProduct,
  variableAttribute,
}) => {
  if (!main) return null;
  if (!attribute.attribute) return null;
  return variableAttribute === attribute.id ? (
    <span>Вариабельный признак</span>
  ) : (
    <button onClick={() => updateProduct('variableAttribute', attribute.id)}>
      Сделать вариабельным признаком
    </button>
  );
};

const ProductForm = ({
  product,
  updateProduct,
  categoryOptions,
  brandOptions,
  attributeOptions,
  main,
}) => {
  const {
    name,
    categories,
    brand,
    price,
    promoPrice,
    description,
    availability,
    images,
    attributes,
    variableAttribute,
  } = product;

  const setMainImage = (image) => {
    updateProduct('images', [image, ...images.slice(1)]);
  };

  const deleteMainImage = (id) => {
    updateProduct('images', [{}, ...images.slice(1)]);
  };

  const updateImages = (image) => {
    updateProduct('images', [...images, image]);
  };

  const deleteImage = (id) => {
    updateProduct(
      'images',
      images.filter((img) => img.id !== id)
    );
  };

  const addAttribute = () => {
    const id = Math.random();
    updateProduct('attributes', [
      ...attributes,
      {
        id,
        key: id,
      },
    ]);
  };

  const attrIds = attributes.map((a) => a.id);
  const avaliableAttributes = attributeOptions.map((a) => {
    if (attrIds.includes(a.id)) {
      return {
        ...a,
        disabled: true,
      };
    }
    return a;
  });

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Form>
          <Form.Field>
            <label>Название*</label>
            <input
              value={name}
              placeholder="Название"
              onChange={(e) => updateProduct('name', e.target.value)}
            />
          </Form.Field>
          <CategoriesSelector
            categories={categories}
            setCategories={(value) => updateProduct('categories', value)}
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
                onChange={(e, { value }) => updateProduct('brand', value)}
              />
              <BrandForm />
            </div>
          </Form.Field>
          <Form.Field>
            <label>Цена*</label>
            <input
              value={price}
              placeholder={0}
              onChange={(e) => updateProduct('price', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Цена со скидкой*</label>
            <input
              value={promoPrice}
              placeholder={0}
              onChange={(e) => updateProduct('promoPrice', e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Описание*</label>
            <Editor
              text={description}
              onChange={(value) => updateProduct('description', value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Наличие*</label>
            <Checkbox
              checked={availability}
              label="В наличии"
              onChange={(e) => updateProduct('availability', !availability)}
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
                <div
                  key={attribute.key}
                  className="ProductForm-variable-attriubte"
                >
                  <AttributeItem
                    attribute={attribute}
                    attributes={attributes}
                    setAttributes={(value) =>
                      updateProduct('attributes', value)
                    }
                    options={transformOptions(attributeOptions)}
                  />

                  {renderPickVariable({
                    main,
                    attribute,
                    variableAttribute,
                    updateProduct,
                  })}
                </div>
              );
            })}
            <Button type="button" onClick={addAttribute}>
              Добавить
            </Button>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ProductForm;
